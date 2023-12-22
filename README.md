# Custom ChatGPT Client

This is a custom client for the [ChatGPT](https://chat.openai.com/) API.

> [!CAUTION]
> This is just a client for local testing, do not put your API key in a public environment!

## Begin Your-GPT

Insert your ChatGPT API key and the GPT Host you are using into your terminal

### Using Bash

```bash
echo '# ChatGPT' >> ~/.bashrc
echo 'export GPT_TOKEN="YOUR_API_KEY"' >> ~/.bashrc
echo 'export GPT_HOST="YOUR_HOST"' >> ~/.bashrc
```

source ~/.bashrc

```bash
source ~/.bashrc
```

### Using ZSH

```bash
echo '# ChatGPT' >> ~/.zshrc
echo 'export GPT_TOKEN="YOUR_API_KEY"' >> ~/.zshrc
echo 'export GPT_HOST="YOUR_HOST"' >> ~/.zshrc
```

source ~/.zshrc

```bash
source ~/.zshrc
```

## Usage

```bash
pnpm install
```

### Dev Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```
