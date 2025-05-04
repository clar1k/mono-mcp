# Mono-MCP

A Model Context Protocol (MCP) server for Monobank API integration, allowing AI assistants to retrieve bank statements and transaction data directly from Monobank accounts.

## Features

- Query Monobank statements by date range
- Format transaction data for easy reading
- Implements Model Context Protocol for AI assistant integration

## Requirements

- [Bun](https://bun.sh) v1.2.2 or higher
- Monobank API key

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mono-mcp.git
cd mono-mcp

# Install dependencies
bun install
```

## Configuration

Create a `.env` file in the root directory with your Monobank API key:

```
MONO_API_KEY=your_monobank_api_token_here
```

You can obtain your API key from the [Monobank personal cabinet](https://api.monobank.ua/).

## Usage

Start the MCP server:

```bash
bun run dev
```

This will start the Model Context Protocol server that can be used by AI assistants to query your Monobank transactions.

### Available Tools

- `get_monobank_statement_from_to_date`: Retrieves bank statements between two dates

## Development

```bash
bun run dev
```

## About Model Context Protocol

The Model Context Protocol (MCP) enables AI assistants to safely access external data sources and perform actions. Learn more about MCP at [modelcontextprotocol.github.io](https://modelcontextprotocol.github.io/).
