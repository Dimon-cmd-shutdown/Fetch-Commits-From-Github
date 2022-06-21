const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
    auth: process.env.TOKEN
})

const octokitSet = async () => {
    const response = await octokit.request('GET https://api.github.com/search/commits?q=test repo:facebook/facebook', {
        // owner: 'Dimon-cmd-shutdown',
        // repo: 'chat-app'
    })
    return response
}

module.exports = octokitSet



