require('dotenv').config();

import { test, expect } from '@playwright/test';

import axios from 'axios';

test('Should be able to run transcoding task via Qencode API', async () => {

    const requestUrl = "https://api.qencode.com/v1/"

    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        throw new Error('Please define the API_KEY environment variable');
    }
    
    // 1. Getting access token

    let searchParams = new URLSearchParams({
        api_key: API_KEY 
    });

    let parameters = searchParams.toString()

    let response = await axios.post(
        requestUrl + "access_token",
        parameters,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }
    );

    //console.log("response.data: ", response.data)
    
    expect(response.data).toEqual(expect.objectContaining({
        token: expect.any(String)
    }));

    const token = response.data.token

    // 2. Creating task

    searchParams = new URLSearchParams({
        token: token
    });

    parameters = searchParams.toString()

    response = await axios.post(
        requestUrl + "create_task",
        parameters,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }
    );

    //console.log("response.data: ", response.data)

    expect(response.data).toEqual(expect.objectContaining({
        task_token: expect.any(String)
    }));

    const task_token = response.data.task_token

    // 3. Start transcoding

    let taskParams = {
        "source": "https://nyc3.digitaloceanspaces.com/qencode/bbb_2s.mp4",
        "format": [
          {
            "output": "mp4",
            "size": "320x240",
            "video_codec": "libx264"
          }
        ]
    };           

    let query = { query: taskParams };

    let query_json = JSON.stringify(query);
       
    searchParams = new URLSearchParams({
        task_token: task_token,
        query: query_json
    });

    parameters = searchParams.toString()

    response = await axios.post(
        requestUrl + "start_encode2",
        parameters,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }
    );    

    //console.log("response.data: ", response.data)

    expect(response.data).toEqual(expect.objectContaining({
        status_url: expect.any(String)
    }));

    const status_url = response.data.status_url

    // 4. Get status

    searchParams = new URLSearchParams({
        "task_tokens[]": task_token
    });

    parameters = searchParams.toString()

    response = await axios.post(
        status_url,
        parameters,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }
    );      

    //console.log("response.data: ", response.data)

    expect(response.data).toEqual(expect.objectContaining({
        statuses: expect.any(Object)
    }));

});