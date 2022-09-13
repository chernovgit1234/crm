export default {
  
  install: (app, options) => {
    app.config.globalProperties.$message = text => {

      console.log('texttexttext', text)
      const toast = document.getElementById('toast')
      toast.classList.add('info-toast')
      toast.innerText = text
      
    }
    app.config.globalProperties.$error = text => {
      const toast = document.getElementById('toast')
      toast.classList.add('error-toast')
      toast.innerText =  text
      
    }
  }
}