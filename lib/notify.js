const axios = require('axios').default;

const webhookURL = process.env.SLACK_WEBHOOK_URL

module.exports = async function notify(data) {
  if (!webhookURL) {
    console.log('Not using slack notification. New data', data);
    return;
  }

  return axios.post(webhookURI, {
    attachments: data.map(item => ({
      title: item.title,
      title_link: item.link,
      fields: [
        {
          title: 'Bunga',
          value: `${item.interest}% p.a`
        },
        {
          title: 'Durasi',
          value: `${item.duration} hari`,
        },
        {
          title: 'Pengembalian',
          value: item.returnType,
        }
      ]
    }))
  });
}
