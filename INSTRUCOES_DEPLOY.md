# Como Ativar o Deploy Automático para o Hostinger (Com 1 Clique) 🚀

Devido às restrições de segurança do GitHub e da Hostinger, as ferramentas externas não podem criar workflows de automação diretamente. No entanto, podes ativar o deploy automático em menos de 1 minuto seguindo estes passos simples:

### Passo 1: Criar o ficheiro de Deploy no GitHub
1. Acede ao teu repositório no GitHub: [**cartes-hills**](https://github.com/ricardomagalhaes014/cartes-hills)
2. Clica no botão **Add file** -> **Create new file**.
3. No nome do ficheiro, escreve exatamente: `.github/workflows/deploy.yml`
4. No conteúdo do ficheiro, cola o seguinte código:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches:
      - main

jobs:
  web-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
    - name: 🚚 Get latest code
      uses: actions/checkout@v3

    - name: Use Node.js 20
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    - name: 🔧 Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8

    - name: 📦 Install dependencies
      run: pnpm install

    - name: 🏗️ Build Project
      run: pnpm run build

    - name: 📂 Sync files to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: 147.79.79.32
        username: u172337921
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./dist/public/
        server-dir: ./public_html/cartes-hills/
```
5. Clica em **Commit changes...** no canto superior direito para guardar.

### Passo 2: Configurar a Palavra-passe do FTP no GitHub
Para que o GitHub possa enviar os ficheiros de forma segura para o teu Hostinger:
1. No teu repositório do GitHub, clica no separador **Settings** (Definições) no topo.
2. No menu lateral esquerdo, clica em **Secrets and variables** -> **Actions**.
3. Clica no botão verde **New repository secret**.
4. No campo **Name**, escreve exatamente: `FTP_PASSWORD`
5. No campo **Secret**, escreve a tua palavra-passe do Hostinger: `Dps2026#`
6. Clica em **Add secret**.

### Pronto! 🎉
A partir de agora, sempre que houver qualquer alteração ou push para o teu GitHub, o site será compilado e publicado **automaticamente** em `dpsimobiliario.pt/cartes-hills` sem que tenhas de fazer mais nada!
