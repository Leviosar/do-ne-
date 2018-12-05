document.querySelector('body > main > section > form > button').addEventListener('click', ()=>{
    if (testFields(document.querySelectorAll('input'))) {
        user.signUp(document.querySelectorAll('input'))
    }else{
        swal({
            title: 'Preenche isso ai direito',
            icon: 'error'
        })
    }
})

function testFields(arr){
    for (const item of arr) if (item.value.trim() == '') return false
    return true
}