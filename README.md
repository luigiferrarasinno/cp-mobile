# 📱 App Lista de Usuários - React Native Expo

Um aplicativo mobile desenvolvido em React Native com Expo que permite gerenciar uma lista de usuários com avatares personalizados, edição, exclusão e persistência de dados.

**Desenvolvido por:** Luigi Ferrara  
**RM:** 98047

## 🚀 Funcionalidades

- ✅ **Lista de Usuários**: Visualização de todos os usuários cadastrados
- ✅ **Cadastro de Usuários**: Formulário para adicionar novos usuários
- ✅ **Edição de Usuários**: Editar informações de usuários existentes
- ✅ **Exclusão de Usuários**: Remover usuários com confirmação
- ✅ **Avatares Personalizados**: Escolha entre emojis ou imagens públicas
- ✅ **Validação de Formulário**: Campos obrigatórios com alertas customizados
- ✅ **Persistência de Dados**: Dados salvos localmente com AsyncStorage
- ✅ **Design Responsivo**: Interface adaptada para mobile

## 🎨 Screenshots

### Tela Principal - Lista de Usuários
- Header com cor #ed145b
- Lista de usuários com avatares
- Botão "+" para adicionar novos usuários
- Botões de editar (✏️) e excluir (🗑️) para cada usuário

### Tela de Formulário
- Campos: Nome, Email, Avatar
- Seleção de avatares com emojis
- Galeria de avatares públicos
- Validação com modal personalizado
- Modo criação e edição

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **AsyncStorage** - Persistência de dados local
- **Expo Router** - Navegação entre telas

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Expo CLI
- Emulador Android/iOS ou dispositivo físico com Expo Go

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd my-app
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Instale o AsyncStorage
```bash
npm install @react-native-async-storage/async-storage
```

### 4. Execute o projeto
```bash
npm start
```

### 5. Abra no dispositivo
- Escaneie o QR code com o Expo Go (Android)
- Ou use a câmera do iPhone (iOS)
- Ou execute em emulador: `npm run android` / `npm run ios`

## 📁 Estrutura do Projeto

```
my-app/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Layout das tabs
│   │   └── index.tsx        # Tela principal (Lista de Usuários)
│   ├── user-form.tsx        # Tela de formulário
│   └── _layout.tsx          # Layout raiz
├── assets/                  # Imagens e recursos
├── components/              # Componentes reutilizáveis
├── constants/               # Constantes e cores
└── package.json
```

## 🔨 Como Foi Desenvolvido

### Passo 1: Configuração Inicial
- Criado projeto Expo com TypeScript
- Instalado AsyncStorage para persistência
- Configurado roteamento com Expo Router

### Passo 2: Tela Lista de Usuários (`app/(tabs)/index.tsx`)
```typescript
// Principais implementações:
- useState para gerenciar lista de usuários
- useEffect para carregar dados do AsyncStorage
- useFocusEffect para recarregar ao voltar da tela de formulário
- FlatList para renderizar lista
- Suporte a avatares emoji e imagens URL
- Navegação com parâmetros para edição
- Função de exclusão com confirmação
- Botões de ação (editar/excluir) para cada item
```

### Passo 3: Tela de Formulário (`app/user-form.tsx`)
```typescript
// Principais implementações:
- Estados para controlar campos do formulário
- useLocalSearchParams para receber dados de edição
- Validação de campos obrigatórios
- Modal customizado para alertas
- ScrollView horizontal para seleção de avatares
- Galeria de avatares públicos do Pixabay
- Função de salvamento que suporta criação e edição
- Interface adaptativa (criar/editar)
```

### Passo 4: Persistência de Dados
```typescript
// AsyncStorage implementado para:
- Salvar novos usuários
- Carregar usuários existentes
- Dados de exemplo pré-carregados
- Sincronização entre telas
```

### Passo 5: Design e Estilização
```typescript
// StyleSheet com:
- Cor principal: #ed145b
- Layout responsivo
- Sombras e elevações
- Bordas arredondadas
- Tipografia consistente
```

## 🎯 Funcionalidades Detalhadas

### Lista de Usuários
- **Header**: Título "Lista de Usuários" com botão "+"
- **Avatar**: Suporte a emojis e URLs de imagem
- **Dados**: Nome e email de cada usuário
- **Ações**: Botões de editar (✏️) e excluir (🗑️)
- **Navegação**: Toque no "+" para adicionar, nos botões para editar/excluir
- **Confirmação**: Dialog de confirmação antes de excluir

### Formulário de Usuários
- **Campo Nome**: TextInput obrigatório
- **Campo Email**: TextInput com teclado de email
- **Avatares Emoji**: ScrollView horizontal com seleção
- **Avatares Públicos**: Galeria de imagens do Pixabay
- **Validação**: Modal "Ops!" para campos vazios
- **Modos**: Criação (Salvar) e Edição (Atualizar)
- **Navegação**: Botão voltar e salvamento automático

### Avatares Públicos Incluídos
```typescript
const publicAvatars = [
  'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png',
  'https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1868314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_960_720.jpg',
  // ... mais avatares
];
```

## 🚦 Como Usar

1. **Visualizar Usuários**: App abre na lista com 3 usuários de exemplo
2. **Adicionar Usuário**: Toque no "+" no canto superior direito
3. **Editar Usuário**: Toque no botão ✏️ ao lado do usuário desejado
4. **Excluir Usuário**: Toque no botão 🗑️ e confirme a exclusão
5. **Preencher Formulário**: Digite nome, email e escolha um avatar
6. **Escolher Avatar**: Selecione emoji ou imagem pública
7. **Salvar**: Toque em "Salvar" (novo) ou "Atualizar" (edição)
8. **Validação**: Campos vazios mostrarão modal de erro
9. **Voltar**: Use o botão "←" para retornar à lista

## 🔧 Comandos Úteis

```bash
# Iniciar desenvolvimento
npm start

# Executar no Android
npm run android

# Executar no iOS  
npm run ios

# Executar na web
npm run web

# Limpar cache
npx expo start --clear
```

## 🎨 Personalização

### Alterar Cor Principal
```typescript
// Altere em todos os arquivos a cor #ed145b para sua preferência
backgroundColor: '#ed145b'  // Nova cor aqui
```

### Adicionar Novos Avatares
```typescript
// Em user-form.tsx, adicione URLs no array:
const publicAvatars = [
  'https://sua-nova-imagem.com/avatar.jpg',
  // ... outros avatares
];
```

### Modificar Campos do Usuário
```typescript
// Interface User em ambos os arquivos:
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  // Adicione novos campos aqui
}
```

## 🐛 Solução de Problemas

### Erro "Module not found"
```bash
rm -rf node_modules
npm install
```

### Erro no AsyncStorage
```bash
npm install @react-native-async-storage/async-storage
```

### Cache do Expo
```bash
npx expo start --clear
```

## 📱 Compatibilidade

- **Android**: API 21+ (Android 5.0+)
- **iOS**: iOS 13+
- **Web**: Navegadores modernos

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido seguindo as melhores práticas:

- **TypeScript**: Tipagem estática para maior segurança
- **Componentes Funcionais**: Hooks para gerenciamento de estado
- **Código Limpo**: Separação de responsabilidades
- **Interface Responsiva**: Design adaptado para mobile
- **Persistência**: Dados salvos localmente

## 🚀 Próximas Melhorias

- [x] Edição de usuários existentes ✅
- [x] Exclusão de usuários ✅
- [ ] Busca e filtros
- [ ] Foto da câmera como avatar
- [ ] Validação de email
- [ ] Temas claro/escuro
- [ ] Backup e restore de dados

## 👨‍💻 Autor

**Luigi Ferrara**  
RM: 98047  
Projeto desenvolvido para a disciplina de Computação Mobile

---

**Desenvolvido com ❤️ usando React Native + Expo**
#   c p - m o b i l e  
 