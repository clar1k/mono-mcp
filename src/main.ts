import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import kylib from "ky";

import dayjs from "dayjs";
import { env } from "./env";

type MonoResponse = Array<{
  id: string;
  time: number;
  description: string;
  mcc: number;
  originalMcc: number;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  hold: boolean;
  receiptId: string;
}>;

const server = new McpServer({
  name: "MonoBank MCP Server",
  version: "1.0.0",
});

const ky = kylib.extend({
  prefixUrl: "https://api.monobank.ua/",
  throwHttpErrors: false,
});

server.tool(
  "get_monobank_statement_from_to_date",
  "Get Bank Statement (All Transactions) in range date {from}:{to}",
  {
    from: z.string().datetime().describe("From - the date in UTC format."),
    to: z.string().datetime().describe("To - the date in UTC format."),
  },
  async ({ from, to }) => {
    try {
      const fromTimestamp = dayjs(from).unix();
      const toTimeStamp = dayjs(to).unix();

      const response = await ky.get(
        `personal/statement/0/${fromTimestamp}/${toTimeStamp}`,
        {
          headers: {
            "X-Token": "uUY_posmc79Fhc_KsFsHMcSxGfz1AHX8DHngz7Rdotqo",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data = await response.json<MonoResponse>();

      const formatted = data.map((value) => {
        const date = dayjs(value.time).format("DD/MM/YYYY");
        return {
          date: date,
          amount: value.amount / 100,
          balance: value.balance / 100,
          description: value.description,
        };
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(formatted),
          },
        ],
      };
    } catch (error) {
      throw error;
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
