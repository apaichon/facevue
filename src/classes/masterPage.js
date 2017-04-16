import * as modes from '@/stores/crudMode'
import $ from 'jquery'
import api from '@/api/products'

export default function () {
  var _this = this
  const members = {
    labels: {
      dataPager: {
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        totalPages: 'Total Pages',
        totalItems: 'Total Items',
        currentPage: 'Current Page'
      },
      edit: 'Edit',
      delete: 'Delete',
      moreDetail: 'More ...',
      title: 'Product Maintenance',
      subtitle: `This is a product master page. It's purpose to maintenance, create, update, delete and search.`,
      titleList: 'Product List',
      titleDetail: 'Product Detail',
      statusTitle: 'Error',
      menuId: 'pagerMenu'
    },
    bindingKeys: {
      headerKey: 'productCode',
      descKey: 'productName',
      itemsKey: 'products',
      itemKey: 'product',
      primaryKey: 'productCode',
      moreDetails: {
        fields: [
          {
            label: 'Product Code',
            keyId: 'productCode'
          },
          {
            label: 'Product Name',
            keyId: 'productName'
          },
          {
            label: 'Product Category',
            keyId: 'productCategory'
          },
          {
            label: 'Product Type',
            keyId: 'productType'
          },
          {
            label: 'Product Standard Value',
            keyId: 'productValue'
          },
          {
            label: 'Product Unit',
            keyId: 'productUnit'
          },
          {
            label: 'Status',
            keyId: 'status'
          }
        ]
      }
    },
    ids: {
      selectedItemId: 'ddlProductSelected',
      modalId: 'modalMessage',
      confirmId: 'confirmModal'
    },
    actionKeys: {
      ADD_ITEM: 'addProducts',
      GET_ITEM: 'getProduct',
      GET_ITEMS: 'getProducts',
      GET_MODE: 'getMode',
      GET_TEXTSEARCH: 'getTextSearch',
      GET_CURRENTPAGE: 'getCurrentPage',
      SET_MODE: 'setMode',
      SET_ITEMS: 'setProducts',
      SET_TEXTSEARCH: 'setTextSearch',
      SET_CURRENTPAGE: 'setCurrentPage',
      UPDATE_ITEM: 'updateProduct',
      REMOVE_ITEM: 'removeProduct'
    },
    messages: {
      headerTitle: 'Completed',
      message: 'Insert Successfully',
      deleteMsg: 'Are you sure to delete $item ?'
    },
    states: {
      fieldMessages: [],
      item: {},
      selectedItem: {},
      statusList: [
        {code: 0, name: 'In Active'},
        {code: 1, name: 'Active'}
      ],
      mode: modes.READ,
      itemsDetail: [],
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      saveType: 0
    },
    validateRules: {
      fields: {
        code: {
          identifier: 'productCode',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your product code!'
          }]
        },
        name: {
          identifier: 'productName',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your product name!'
          }]
        },
        statusCode: {
          identifier: 'statusCode',
          rules: [{
            type: 'empty',
            prompt: 'Please enter your status!'
          }]
        }
      }
    }
  }
  const actions = {
    uis: {
      createAccordion: () => {
        $('.ui.accordion').accordion()
      },
      disabledUI: (id, isDisabled) => {
        $(id).attr('disabled', isDisabled)
      },
      disableFields: (isDisabled) => {
        if (isDisabled) {
          $('input').addClass('disabled')
        } else {
          $('.field.disabled').removeClass('disabled')
        }
      },
      focusUI: (id) => {
        $(id).focus()
      },
      openConfirm: () => {
        $('#confirmModal').modal('show')
      },
      openEditor: () => {
        $('.ui.accordion').accordion('open', 1)
      },
      openList: () => {
        $('.ui.accordion').accordion('open', 0)
        $('.ui.accordion').accordion('close', 1)
      },
      hideError: () => {
        $('.ui.error.message').transition('hide')
      },
      selectedDropdown: (index) => {
        // $('#' + members.ids.selectedItemId).prop('selectedIndex', index)
        members.states.selectedItem = index
      },
      showError: () => {
        $('.ui.error.message').transition('show')
      },
      validateForm: (rules) => {
        $('.ui.form').form(rules)
      },
      showModalSuccess: (msg) => {
        var modalId = '#' + members.ids.modalId
        $(modalId).removeClass('error message')
        $(modalId).addClass('success message')
        $(modalId).modal('show')
        members.messages.headerTitle = 'Completed'
        members.messages.message = msg
      },
      showModalFail: (msg) => {
        var modalId = '#' + members.ids.modalId
        $(modalId).removeClass('success message')
        $(modalId).addClass('error message')
        $(modalId).modal('show')
        members.messages.headerTitle = 'Error'
        members.messages.message = msg
      },
      showMoreDetail: () => {
        $('#moredetail').modal('show')
      }
    },
    utils: {
      focusOnError: (fields) => {
        $.each(fields, (e) => {
          var ele = $('#' + e)
          var fail = (ele.val() === false || ele.val().length === 0)
          if (fail) {
            ele.focus()
            $('html,body').animate({
              scrollTop: ele.offset().top - ($(window).height() - ele.outerHeight(true)) / 2
            }, 200)
            return false
          }
        })
      }
    },
    crud: {
      setMode: (mode) => {
        switch (mode) {
          case modes.READ:
            dispatch.setMode(modes.READ)
            actions.uis.disableFields(true)
            break
          case modes.CREATE:
            actions.crud.create()
            actions.uis.disableFields(false)
            break
          case modes.UPDATE:
            actions.crud.update()
            break
        }
      },
      create: () => {
        dispatch.setMode(modes.CREATE)
        actions.uis.openEditor()
        actions.uis.disabledUI('#' + members.bindingKeys.headerKey, false)
        members.states.item = {statusCode: 0}
        actions.uis.focusUI('#' + members.bindingKeys.headerKey)
      },
      readMoreDetail: (index) => {
        members.states.item = dispatch.getItemByIndex(index)
        members.states.itemsDetail = actions.crud.convertToMoreDetail(members.states.item)
        dispatch.setMode(modes.READ)
        actions.uis.showMoreDetail()
      },
      convertToMoreDetail: (item) => {
        var itemsDetail = []
        var fields = members.bindingKeys.moreDetails.fields
        for (let i = 0; i < fields.length; i++) {
          var field = {}
          field.label = fields[i].label
          field.value = item[fields[i].keyId]
          itemsDetail.push(field)
        }
        return itemsDetail
      },
      update: (index) => {
        console.log('item index:', index)
        members.states.item = dispatch.getItemByIndex(index)
        dispatch.setMode(modes.UPDATE)
        actions.uis.openEditor()
        actions.uis.disableFields(false)
        actions.uis.disabledUI('#' + members.bindingKeys.headerKey, true)
        actions.uis.focusUI('#' + members.bindingKeys.descKey)
        actions.uis.selectedDropdown(index)
      },
      del: (index) => {
        var item = dispatch.getItemByIndex(index)
        members.states.item = item
        members.messages.deleteMsg = `Are you sure to delete product Name :${item.productName} ?`
        // members.states.selectedItem = item
        actions.uis.openConfirm()
      },
      addItem: (item) => {
        console.log('add Item', item)
        api.methods[members.actionKeys.ADD_ITEM](item)
        .then(function (result) {
          if (result.status === 200) {
            console.log('insert result from server:', result)
            if (members.states.saveType === 0) {
              actions.crud.getItems({'search': '', 'currentPage': 1})
              actions.uis.showModalSuccess(`Insert product ${item.productName} is sucessfully.`)
            } else {
              actions.crud.setMode(modes.CREATE)
            }
          }
        })
        .catch((result) => {
          actions.uis.showModalFail(`Insert product ${item.productName} is failed.`)
        })
      },
      getItems: (condition) => {
        api.methods[members.actionKeys.GET_ITEMS](condition)
        .then(function (result) {
          if (result.data.code === 200) {
            console.log('get items from server', result)
            dispatch.setItems(result.data.results.data)
            members.states.totalItems = result.data.results.totalRecords
            members.states.totalPages = result.data.results.totalPages
            actions.crud.setMode(modes.READ)
            actions.uis.openList()
          }
        })
        .catch((result) => {
          dispatch.setItems([])
          actions.uis.showModalFail(JSON.stringify(result))
        })
      },
      searchItems: (textSearch) => {
        const condition = {search: textSearch, currentPage: 1}
        actions.crud.getItems(condition)
      },
      gotoPage: () => {
        const textSearch = dispatch.getTextSearch()
        const currentPage = dispatch.getCurrentPage()
        actions.crud.getItems({search: textSearch, currentPage: currentPage})
      },
      firstPage: () => {
        dispatch.setCurrentPage(1)
        actions.crud.gotoPage()
      },
      previousPage: () => {
        var currentPage = dispatch.getCurrentPage()
        currentPage--
        currentPage = (currentPage < 1 ? 1 : currentPage)
        dispatch.setCurrentPage(currentPage)
        actions.crud.gotoPage()
      },
      nextPage: () => {
        var currentPage = dispatch.getCurrentPage()
        currentPage++
        currentPage = (currentPage > members.states.totalPages ? members.states.totalPages : currentPage)
        dispatch.setCurrentPage(currentPage)
        actions.crud.gotoPage()
      },
      lastPage: () => {
        dispatch.setCurrentPage(members.states.totalPages)
        actions.crud.gotoPage()
      },
      updateItem: (item) => {
        var data = {condition: {}}
        data.condition[members.bindingKeys.primaryKey] = item[members.bindingKeys.primaryKey]
        data.data = item
        delete data.data['_id']
        console.log('update data', data)
        api.methods[members.actionKeys.UPDATE_ITEM](data)
        .then((result) => {
          if (result.status === 200) {
            console.log('update result from server', result)
            if (members.states.saveType === 0) {
              actions.uis.showModalSuccess(`Update product ${item.productName} is sucessfully.`)
              actions.crud.getItems({search: '', currentPage: 1})
            } else {
              actions.crud.setMode(modes.CREATE)
            }
          }
        })
        .catch((err) => {
          actions.uis.showModalFail(JSON.stringify(err))
        })
      },
      remove: () => {
        $(`#${members.ids.confirmId}`).hide()
        var item = members.states.item
        var data = {}
        data[members.bindingKeys.primaryKey] = item[members.bindingKeys.primaryKey]
        console.log('data delete', data)
        api.methods[members.actionKeys.REMOVE_ITEM](data)
        .then((result) => {
          if (result.status === 200) {
            console.log('Remove result from server', result)
            actions.uis.showModalSuccess(`Remove product ${item.productName} is sucessfully.`)
            actions.crud.getItems({'search': '', 'currentPage': 1})
            actions.crud.setMode(modes.READ)
          }
        })
      }
    }
  }
  const dispatch = {
    addItemToStore: (item) => {
      _this.store.dispatch(members.actionKeys.ADD_ITEM, item).then((result) => {
        actions.uis.selectedDropdown(_this.store.state[members.bindingKeys.itemsKey].length - 1)
        actions.crud.setMode(modes.UPDATE)
        actions.uis.openList()
      })
    },
    getItems: () => {
      console.log('master page get items')
      return _this.store.getters[members.bindingKeys.itemsKey]
    },
    getItemByIndex: (index) => {
      console.log('Get Item By Index :', index)
      return _this.store.getters[members.bindingKeys.itemsKey][index]
    },
    getMode: () => {
      return _this.store.getters.mode
    },
    getTextSearch: () => {
      console.log('get Text Search', _this.store.getters.textSearch)
      return _this.store.getters.textSearch
    },
    getCurrentPage: () => {
      return _this.store.getters.currentPage
    },
    setMode: (mode) => {
      _this.store.dispatch(members.actionKeys.SET_MODE, mode)
    },
    setItems: (items) => {
      _this.store.dispatch(members.actionKeys.SET_ITEMS, items)
    },
    setTextSearch: (textSearch) => {
      _this.store.dispatch(members.actionKeys.SET_TEXTSEARCH, textSearch)
    },
    setCurrentPage: (page) => {
      page = (page < 1 ? 1 : (page > members.states.totalPages ? members.states.totalPages : page))
      _this.store.dispatch(members.actionKeys.SET_CURRENTPAGE, page)
    }
  }
  const events = {
    onSuccess: () => {
      actions.uis.hideError()
      switch (dispatch.getMode()) {
        case modes.CREATE:
          actions.crud.addItem(members.states.item)
          break
        case modes.UPDATE:
          actions.crud.updateItem(members.states.item)
          break
      }
    },
    onFailure: (formErrors, fields) => {
      actions.utils.focusOnError(fields)
      members.fieldMessages = formErrors
      actions.uis.showError()
      return false
    },
    onSave: () => {
      members.states.saveType = 0
      members.validateRules.onFailure = events.onFailure
      members.validateRules.onSuccess = events.onSuccess
      actions.uis.validateForm(members.validateRules)
    },
    onSaveNew: () => {
      members.states.saveType = 1
      members.validateRules.onFailure = events.onFailure
      members.validateRules.onSuccess = events.onSuccess
      actions.uis.validateForm(members.validateRules)
    },
    onSelectedItem: () => {
      // console.log('selected Item', members.states.selectedItem)
      members.states.item = dispatch.getItemByIndex(members.states.selectedItem)
      // members.states.item = members.states.selectedItem
    }

  }

  const use = (opts) => {
    for (let k of Object.keys(opts)) {
      _this[k] = opts[k]
    }
  }
  return {
    members: members,
    actions: actions,
    dispatch: dispatch,
    events: events,
    use: use
  }
}
