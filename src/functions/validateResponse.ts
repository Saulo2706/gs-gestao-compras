import { showNotify } from "./showNotify";

export function validateResponse(message){
    if(message == "AUTH_REGISTER_DUPLICATED_EMAIL"){
        showNotify("Erro", "Email já cadastrado", "danger")
    }else if(message == "AUTH_REGISTER_INVALID_BIRTHDAY"){
        showNotify("Erro", "Idade menor que 2 anos", "danger")
    }else if(message == "AUTH_REGISTER_PASSWORD_SMALL"){
        showNotify("Erro", "Senha menor que 8 caracteres", "danger")
    }else if(message == "AUTH_REGISTER_INVALID_EMAIL"){
        showNotify("Erro", "Email invalido", "danger")
    }else if(message == "AUTH_REGISTER_INVALID_GENDER"){
        showNotify("Erro", "Genero", "danger")
    }else if(message == "AUTH_SIGNIN_USER_NOT_FOUND"){
        showNotify("Erro", "Usuario/Email não encontrado", "danger")
    }else if(message == "AUTH_BAD_CREDENTIALS"){
        showNotify("Erro", "Email ou Senha inválidos", "danger")
    }else if(message == "NON_HANDLED_ERROR"){
        showNotify("Erro", "Essa não! Erro desconhecido!", "danger")
    }else if(message == "BUDGET_REQUEST_ITEM_QUANTITY_INVALID"){
        showNotify("Erro", "Quantidade não pdoe ser decimal para o item UN/PC!", "danger")
    }else{
        showNotify("Erro", "Erro não identificado!", "danger")
    }

}




