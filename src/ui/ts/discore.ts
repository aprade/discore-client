import remote from "./remote";

interface DiscoreAPIResponse {
    status: number,
    guildName?: string,
    message?: string,
}

const checkDiscordGuildisOn = async (GuildID: string) => {
    let res: DiscoreAPIResponse;

    try {
        res = await remote.post('guild_name', {
            'guildId': GuildID,
        });

        switch (res.status) {
            case 404:
                res.message = "I couldn't find this ID in my records. Perhaps the ID you provided is wrong.";
                break;
            case 500:
                res.message = "Something went wrong. Try again later or contact support.";
                break;
            case 200:
                res.message = "You just added me to your guild, let's move on!";
                break;
        }
        return res;
    } catch (error) {
        switch (error.message) {
            case "Failed to fetch":
                res = {
                    status: 500,
                    message: 'Something went wrong. Try again later or contact the support!',
                }
                break;
            default:
                res = {
                    status: 500,
                    message: 'Something went wrong. Try again later or contact the support!',
                }
        }
        return res;
    }
}

export default {
    checkDiscordGuildisOn,
};