const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
    auth: process.env.TOKEN
})

const octokitSet = async () => {
    const response = await octokit.request('GET /repos/Dimon-cmd-shutdown/chat-app/commits', {
        owner: 'Dimon-cmd-shutdown',
        repo: 'chat-app'
    })
    return response
}

octokitSet().then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.log('ERROR!')
})

module.exports = octokitSet()



