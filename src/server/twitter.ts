import axios  from "axios";
import { config } from './config';

export const getAccessToken = async () => {
    try {
        const resp = await axios.post(
            'twitter/oauth2/token',
            '',
            {
                params: {
                    'grant_type': 'client_credentials'
                },
                auth: {
                    username: config.API_KEY,
                    password: config.API_KEY_SECRET
                }
            }
        );
        return Promise.resolve(resp.data.access_token);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

getAccessToken()
    .then((token) => {
       // console.log('====45',token)
        getFollowers(token, '1514565757924905000', 1000)
            .then((result) => {
                console.log(JSON.stringify(result, null, 4));
            })
            .catch(error => console.log(JSON.stringify(error)));
    })
    .catch(error => console.log(JSON.stringify(error)));


const getFollowers = async (token:string, user_id:string, max_number:number) => {
    try {
        // const resps = await axios.get(`twitter1.1/followers/list.json?cursor=-1&screen_name=twitterdev&skip_status=true&include_user_entities=false`);
        // console.log('----45657',resps)
        const resp = await axios.get(
            `twitter/2/users/${user_id}/followers`,
            {
                headers: {
                    'Authorization': 'Bearer '+ token,
                },
                params: {
                    'user.fields': 'created_at',
                    expansions: 'pinned_tweet_id',
                    "tweet.fields":'created_at',
                    'max_results': max_number
                }
            }
        );
        return Promise.resolve(resp.data);
    } catch (err) {
        return Promise.reject(err);
    }
};
