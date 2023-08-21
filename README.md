## About
The `tsuchikun-bot` is a Discord bot script that integrates with the Notion API. Its primary goal is to periodically check a specific Notion database and, upon detecting new entries, relay the information to a Discord channel in the form of an Embed message.Initially, the script initializes clients for both Discord.js and the Notion API. Once the bot becomes online, it invokes the checkNotionUpdates function and sets it to be called repeatedly at 1-minute intervals. This function queries the Notion database to retrieve pages and, for each page that meets specific criteria (i.e., where "contact" is checked and "post" isn't), dispatches an Embed message to a designated Discord channel.

## How to Use
Before running the bot, you'll need to set up your Discord token.
### Step 0: Install discord.js and notion-sdk-js
Install the recommended version 13 of discord.js and the latest version of notion-sdk-js to your local repository.
```
npm install discord.js@v13-lts
npm install @notionhq/client
```
### Step 1: Create the Configuration File
Create a new file named `token.json` in the root directory of your project.
### Step 2: Add the Token
Copy and paste the following content into `token.json`:
```json
{
  "DISCORD_BOT_TOKEN": "YOUR_DISCORD_BOT_TOKEN",
  "DISCORD_CH_ID": "YOUR_DISCORD_CH_ID"
  "NOTION_API_TOKEN": "YOUR_NOTION_API_TOKEN",
  "DISCORD_ROLE_ID": "YOUR_DISCORD_ROLE_ID"
  "NOTION_DATABASE_ID": "YOUR_NOTION_DATABASE_ID"
}
```
⚠️ Warning: Never commit your token.json with your actual token to any public repositories. It's crucial to keep your Discord bot token confidential.
### Step 3: Run the Bot
Once you have set up your token in the token.json file, you can run your bot using the following command:
```
node tsuchi-kun.js
```
