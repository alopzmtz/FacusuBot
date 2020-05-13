exports.run = (client, guild) => {
    console.log(`Ready to rock ${guild.name}`);

    client.user.setPresence({
        activity: {
            name:`Ready to serve on this server`,
            type:`idle`
        }
    });
}