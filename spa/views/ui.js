import View from './view.js'

const template = `Hello form ui`;

export default new View({
  elem: '#ui',
  template,
  hooks: {
    beforeRender: () => {
      // get all needed data
      return 'needed'
    },
    // populate: () => {
    //   return template
    // },
    afterRender: () => {

    },
    render: () => {

    }

  }

})