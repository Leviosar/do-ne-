class User{

    constructor(){
        this.id;
        this.nome;
        this.email;
    }

    async getInfo(callback = ()=>{}){
        this.request('getInfo', null,
        async (response)=>{
            response = await JSON.parse(response)
            this.id = response.idusuario
            this.nome = response.nome
            this.email = response.email
            callback()
        },
        async (errorCode)=>{
            errorCode = await JSON.parse(errorCode)
            swal({
                title: errorCode.error,
                text: errorCode.msg,
                icon: "error"
            }).then(
                ()=>{
                    sessionStorage.clear()
                    location.href = location.origin + location.pathname.substring(0, location.pathname.indexOf('www')) + 'www/index.html'
                }
            )
        })
    }

    async signUp(inputs){
        
        let keys = {
            nome: inputs[0].value,
            email: inputs[1].value,
            senha: inputs[2].value
        }

        console.log(keys)

        this.request('signUp', keys, 
            ()=>{
                swal({
                    title: "Sucesso",
                    text: "Usuário criado",
                    icon: "success"
                })
                setTimeout(function(){ window.location.href = "./login.html"; }, 1000);     
            }, 
            async (errorCode)=>{
                errorCode = await JSON.parse(errorCode)
                swal({
                    title: errorCode.error,
                    text: errorCode.msg,
                    icon: "error"
                })        
                return true;
            }
        )
    }

    async login(email, senha){
        let keys = {
            email : email,
            senha : senha
        }

        let container = document.createElement('div')
        container.classList.add('sk-wave')

        for (let i = 0; i < 5; i++) {
            let divi = document.createElement('div')
            divi.classList.add('sk-rect')
            divi.classList.add('sk-rect'+(i+1))
            container.appendChild(divi)
        }

        swal({
            content: container,
            button: "Carregando!"
        })

        this.request('loginUser', keys, 
            async (response)=>{
                response = await JSON.parse(response)
                window.sessionStorage.setItem('token', response.token)
                swal({
                    title: "Sucesso",
                    text: "Login realizado, redirecionando",
                    icon: "success",
                    button: false
                })
                setTimeout(()=>location.href = "xplist.html",1000);
            },
            (errorCode)=>{
                let data = JSON.parse(errorCode)
                swal({
                    title: data.error,
                    text: data.msg,
                    icon: "error"
                })
            }
        )
    }

    async updateUser(nome, email){
        let keys = {
            nome: nome, 
            email: email,
            idusuario: this.idUsuario
        }

        this.request('updateUser', keys,
            async (response)=>{
                response = await JSON.parse(response)
                if(response.value == true){
                    swal({
                        title: "Sucesso ao atualizar",
                        icon: "success",
                        text: "Seus dados foram atualizados"
                    })
                }
            },
            async (errorCode)=>{
                errorCode = await JSON.parse(errorCode)
                if(errorCode.code){
                    swal({
                        title: "Erro do excluir",
                        text: "Código do erro:" + errorCode.code,
                        icon: "error"
                    })
                }
            }
        )
    } 
    
    async deleteUser(){
        let keys = {
            idusuario: this.idUsuario
        }

        this.request("deleteUser", keys,
            async (response)=>{
                response = await JSON.parse(response)
                if(response.condition){
                    window.sessionStorage.clear()
                    swal({
                        title: "Sucesso",
                        text: "Usuário excluido, você será redirecionado",
                        icon: "success"
                    })
                    setTimeout(()=>location.href = "index.html",1500);
                }else{
                    swal({
                        title: "Erro",
                        text: "Erro ao excluir o usuário, entre em contato conosco",
                        icon: "error"
                    })
                }
            },
            (errorCode)=>{
                swal({
                    title: "Erro",
                    text: "Erro" + errorCode.status,
                    icon: "error"
                })
            }
        )
    }

    async enterGroup(group){

        let keys = {
            group : group,
            id : this.id
        }

        this.request("enterGroup", keys,
            async (response)=>{
                response = await JSON.parse(response)
                if(response.condition){
                    swal({
                        title: "Sucesso",
                        text: "Grupo encontrado, você entrou",
                        icon: "success"
                    })
                }else{
                    swal({
                        title: "Erro",
                        text: "Erro ao encontrar o grupo",
                        icon: "error"
                    })
                }
            },
            (errorCode)=>{
                swal({
                    title: "Erro",
                    text: "Erro" + errorCode.status,
                    icon: "error"
                })
            }
        )
    }

    async createGroup(group){

        let keys = {
            group : group,
            id : this.id
        }

        this.request("createGroup", keys,
            async (response)=>{
                response = await JSON.parse(response)
                if(response.condition){
                    swal({
                        title: "Sucesso",
                        text: "Grupo criado",
                        icon: "success"
                    })
                    this.enterGroup(group)
                }else{
                    swal({
                        title: "Erro",
                        text: "Erro ao criar o grupo",
                        icon: "error"
                    })
                }
            },
            (errorCode)=>{
                swal({
                    title: "Erro",
                    text: "Erro" + errorCode.status,
                    icon: "error"
                })
            }
        )
    }

    async request(opt, payload, callback = ()=>{return true}, errorCallback = ()=>{return false}){
        let resposta = false;
        let url = "http://www.labmatii.ifc-camboriu.edu.br/done/router.php?"
        let token = "&token=" + window.sessionStorage.getItem('token')
        let option = "option=" + opt;
        let req = await fetch(url + option + token, 
        {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if(await req.status === 200){
            resposta = true
            callback(await req.text())
        }else{
            errorCallback(await req.text())
        }
        return resposta
    }
}
