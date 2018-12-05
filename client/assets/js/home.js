document.querySelector('.enter').addEventListener('click', ()=>{
    let inp = document.createElement('input')
    swal({
        title: 'Procure um grupo',
        content: inp
    }).then(
        ()=>{user.enterGroup(inp)}
    )
})

document.querySelector('.create').addEventListener('click', ()=>{
    let inp = document.createElement('input')
    swal({
        title: 'Crie seu grupo',
        content: inp
    }).then(
        ()=>{user.createGroup(inp)}
    )}
)