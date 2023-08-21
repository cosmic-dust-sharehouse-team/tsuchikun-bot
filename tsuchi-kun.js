const { Client, Intents, MessageEmbed } = require("discord.js");
const { Client: NotionClient, LogLevel } = require("@notionhq/client");
const token = require("./token.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const notion = new NotionClient({
  auth: token.NOTION_API_TOKEN,
  logLevel: LogLevel.DEBUG,
});

client.once("ready", () => {
  console.log("Bot is online!");
  checkNotionUpdates();
  setInterval(checkNotionUpdates, 60000);
});

async function checkNotionUpdates() {
  const response = await notion.databases.query({
    database_id: token.NOTION_DATABASE_ID,
  });

  for (const page of response.results) {
    if (page.properties.contact?.checkbox && !page.properties.post?.checkbox) {
      const channelId = token.DISCORD_CH_ID;
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        sendEmbedMessage(channel, page);
        await markAsPosted(page.id);
      }
    }
  }
}

async function markAsPosted(pageId) {
  await notion.pages.update({
    page_id: pageId,
    properties: {
      post: {
        checkbox: true,
      },
    },
  });
}

function sendEmbedMessage(channel, page) {
  const nameValue = page.properties.name?.title[0]?.text?.content || "N/A";
  const userValue = page.properties.user?.rich_text[0]?.text?.content || "N/A";
  const testValue =
    page.properties.test?.multi_select.map((item) => item.name).join(", ") ||
    "N/A";
  const interestValue =
    page.properties.interest?.multi_select
      .map((item) => item.name)
      .join(", ") || "N/A";
  const othersValue =
    page.properties.others?.rich_text[0]?.text?.content || "N/A";
  const urlValue = page.url || "N/A";

  const embed = new MessageEmbed()
    .setTitle("お問い合わせがありました！")
    .setColor("#0099ff")
    .addFields(
      { name: "User", value: `<@${userValue}>`, inline: true },
      { name: "Name", value: nameValue, inline: true },
      { name: "Test", value: testValue, inline: true },
      { name: "Interest", value: interestValue, inline: true },
      { name: "Others", value: othersValue, inline: true },
      { name: "Notion URL", value: urlValue, inline: true }
    );

  channel.send({ content: `<@&${token.DISCORD_ROLE_ID}>`, embeds: [embed] });
}

client.login(token.DISCORD_BOT_TOKEN);
