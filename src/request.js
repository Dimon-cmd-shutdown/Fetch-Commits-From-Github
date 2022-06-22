const { Octokit } = require('@octokit/core')

const octokit = new Octokit({
    auth: process.env.TOKEN
})

const octokitSet = async () => {
    const response = await octokit.request('GET https://api.github.com/search/commits?q=test repo:facebook/facebook', {
    })
    return response
}

module.exports = octokitSet



