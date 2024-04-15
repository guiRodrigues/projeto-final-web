# Gerenciador de Senhas

Um gerenciador de senhas e notas, como o 1Password e LastPass.

## Membros da equipe

414941, Guilherme Santos Rodrigues

## Papéis ou tipos de usuário da aplicação

Usuário não registrado, que apenas visualiza

Usuário registrado, que visualiza e cria entradas (senhas e notas)

## Entidades ou tabelas do sistema

- Usuário/User
- Entrada/Entry (representa uma senha, nota, chave)
- Cofre/Vault (pasta que organiza as entradas)

## Principais funcionalidades da aplicação

- Usuário não registrado consegue ver Entries compartilhadas com ele.
- Usuário registrado consegue criar/visualizar/editar/deletar Entries.
- Usuário registrado consegue criar/visualizar/editar/deletar Vaults.
- Usuário registrado consegue associar as Entries com Vaults.

## Tecnologias e frameworks utilizados

**Frontend:**

VueJS v3.0, Vue-Router, e Axios.

**Backend:**

Node.js e Express.

## Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Usuário |  |    |  |  |
| Entry | X |  X  |  X | X |
| Vault | X |  X  | X | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## Rotas da API REST utilizadas

Claro, aqui está a lista de rotas da API REST em uma tabela simples:

| Método HTTP | URL               |
|-------------|-------------------|
| GET         | /api/entries      |
| POST        | /api/entries      |
| GET         | /api/entries/:id  |
| PUT         | /api/entries/:id  |
| DELETE      | /api/entries/:id  |
| GET         | /api/vaults       |
| POST        | /api/vaults       |
| GET         | /api/vaults/:id   |
| PUT         | /api/vaults/:id   |
| DELETE      | /api/vaults/:id   |