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
      primaryKey: 'productCode'
    },
    ids: {
      selectedItemId: 'ddlProductSelected',
      modalId: 'modalMessage'
    },
    actionKeys: {
      ADD_ITEM: 'addProducts',
      GET_ITEM: 'getProduct',
      GET_ITEMS: 'getProducts',
      GET_MODE: 'getMode',
      SET_MODE: 'setMode',
      SET_ITEMS: 'setProducts',
      UPDATE_ITEM: 'updateProduct'
    },
    messages: {
      headerTitle: 'Completed',
      message: 'Insert Successfully'
    },
    states: {
      fieldMessages: [],
      item: {},
      selectedItem: {},
      statusList: [
        {code: 0, name: 'In Active'},
        {code: 1, name: 'Active'}
      ],
      mode: modes.READ
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
      focusUI: (id) => {
        $(id).focus()
      },
      openEditor: () => {
        $('.ui.accordion').accordion('open', 1)
      },
      openList: () => {
        $('.ui.accordion').accordion('open', 0)
      },
      hideError: () => {
        $('.ui.error.message').transition('hide')
      },
      selectedDropdown: (index) => {
        $('#' + members.ids.selectedItemId).prop('selectedIndex', index)
      },
      showError: () => {
        $('.ui.error.message').transition('show')
      },
      validateForm: (rules) => {
        $('.ui.form').form(rules)
      },
      showModalSuccess: (msg) => {
        $('#' + members.ids.modalId).removeClass('error message')
        $('#' + members.ids.modalId).addClass('success message')
        $('.ui.modal').modal('show')
        members.messages.headerTitle = 'Completed'
        members.messages.message = msg
      },
      showModalFail: (msg) => {
        $('#' + members.ids.modalId).removeClass('success message')
        $('#' + members.ids.modalId).addClass('error message')
        $('.ui.modal').modal('show')
        members.messages.headerTitle = 'Error'
        members.messages.message = msg
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
          case modes.CREATE:
            actions.crud.create()
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
        members.states.item = {}
        actions.uis.focusUI('#' + members.bindingKeys.headerKey)
      },
      update: (index) => {
        console.log('item index:', index)
        members.states.item = dispatch.getItemByIndex(index)
        console.log('item', members.states.item)
        dispatch.setMode(modes.UPDATE)
        actions.uis.openEditor()
        actions.uis.disabledUI('#' + members.bindingKeys.headerKey, true)
        actions.uis.focusUI('#' + members.bindingKeys.headerKey)
      },
      addItem: (item) => {
        api.methods[members.actionKeys.ADD_ITEM](item)
        .done(function (result) {
          console.log('insert result from server:', result)
          actions.uis.showModalSuccess(`Insert product ${item.productName} is sucessfully.`)
          actions.crud.getItems({})
        })
        .fail((result) => {
          actions.uis.showModalFail(`Insert product ${item.productName} is failed.`)
        })
      },
      getItems: (condition) => {
        api.methods[members.actionKeys.GET_ITEMS](condition)
        .done(function (result) {
          dispatch.setItems(result.output)
          actions.uis.openList()
        })
        .fail((result) => {
          dispatch.setItems([])
        })
      },
      updateItem: (item) => {
        var data = {condition: {}}
        data.condition[members.bindingKeys.primaryKey] = item[members.bindingKeys.primaryKey]
        data.data = item
        console.log('data', JSON.stringify(data))
        api.methods[members.actionKeys.UPDATE_ITEM](JSON.stringify(data))
        .done((result) => {
          console.log('update result from server', result)
          actions.uis.showModalSuccess(`Update product ${item.productName} is sucessfully.`)
          actions.crud.getItems({})
        })
        .fail(() => {

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
    setMode: (mode) => {
      _this.store.dispatch(members.actionKeys.SET_MODE, mode)
    },
    setItems: (items) => {
      _this.store.dispatch(members.actionKeys.SET_ITEMS, items)
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
      members.validateRules.onFailure = events.onFailure
      members.validateRules.onSuccess = events.onSuccess
      actions.uis.validateForm(members.validateRules)
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
