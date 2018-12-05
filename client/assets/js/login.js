document.querySelector('body > main > section > form > button').addEventListener('click', ()=>{
    if (testFields(document.querySelectorAll('body > main > section > form > div > input'))) {
        user.login(document.querySelectorAll('body > main > section > form > div > input'))
    }else{
        swal({
            title: 'Preenche isso ai direito meu',
            icon: 'error'
        })
    }
})

function testFields(arr){
    for (const item of arr) if (item.value.trim() == '') return false
    return true
}