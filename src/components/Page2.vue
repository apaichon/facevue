<template>
  <div>
    <h2 class="ui icon header">
      <i class="settings icon"></i>
      <div class="content">
        Account Settings
        <div class="sub header">Manage your account settings and set e-mail preferences.</div>
      </div>
    </h2>
    <div class="ui fluid action input">
      <input type="text" placeholder="Search...">
      <button class="ui basic button">
  <i class="icon search"></i>
  Search
</button>
      <div class="ui teal labeled icon button">
        Create New
        <i class="add icon"></i>
      </div>
    </div>

    <div class="ui styled fluid accordion">
      <div class="title active">
        <i class="dropdown icon"></i> Product List
        <a class="ui teal tag label">Mode</a>
      </div>
      <div class="content active">

        <div class="ui action input center aligned container">
          <button class="ui icon button">
    <i class="angle double left icon"></i>
    First
  </button>
          <button class="ui icon button">
    <i class="angle left icon"></i>
    Previous
  </button>

   <input type="text" class="ui center aligned segment" placeholder="Current Page">
    
          <button class="ui icon button">
   Next
    <i class="angle right icon"></i>
  </button>
          <button class="ui icon button">
    Last
    <i class="angle double right icon"></i>
  </button>
        </div>

      
  <a class="ui label center aligned segment">
    11
  </a>
  <a class="ui label center aligned segment">
    22
  </a>
      

        <div class="ui middle aligned divided list">
          <div class="item">
            <div class="right floated content">
              <div class="ui button">Edit</div>
            </div>

            <img class="ui avatar image">
            <div class="content">
              Lena
            </div>
          </div>
          <div class="item">
            <div class="right floated content">
              <div class="ui button">Edit</div>
            </div>
            <div class="right floated content">
              <div class="ui red button">Delete</div>
            </div>
            <img class="ui avatar image">
            <div class="content">
              Lindsay
            </div>
          </div>
          <div class="item">
            <div class="right floated content">
              <div class="ui button">Edit</div>
            </div>
            <img class="ui avatar image">
            <div class="content">
              Mark
            </div>
          </div>
          <div class="item">
            <div class="right floated content">
              <div class="ui button">Edit</div>
            </div>
            <img class="ui avatar image">
            <div class="content">
              Molly
            </div>
          </div>
        </div>
      </div>
      <div class="title">
        <i class="dropdown icon"></i> Product Detail
      </div>
      <div class="content">
        <p class="transition hidden">There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that
          they find to be compatible with their own lifestyle and desires from a companion.</p>
      </div>
      <div class="title">
        <i class="dropdown icon"></i> How do you acquire a dog?
      </div>
      <div class="content">
        <p class="transition hidden">Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.</p>
        <p class="transition hidden">A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the
          pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps
          give a good home to a dog who may not find one so readily.</p>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'page2',
  mounted: function () {
    $('.ui.accordion').accordion()
  },
  data () {
    return {
      msg: 'Hello Page2'
    }
  }
}
</script>
