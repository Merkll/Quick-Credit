import View from './view.js'

const template = `<div> Hello {{name}} <div id="ui"></div> </div>`;

export default new View({
  elem: '#dashboard',
  template,
  hooks: {
    data: () => {
      //query data here
      return 'miracle'
    },
    populate: function(data) {
      // populate template here
      return this.template.replace('{{name}}', data)
    },
    afterRender: () => {
      // after rendering 
    },
    render: () => {
      // view specific rendering here render all components here
    }

  }

})