const axios = require('axios').default;

function dayDiff(d2, d1) {
  const delta = new Date(d2) - new Date(d1);
  return (delta / 1000 / 60 / 60 / 24).toFixed(0)
}

module.exports = async function scrape() {
  const res = await axios.get("https://dashboard.tanifund.com/api/projects?itemsPerPage=12&sort=-cutoffAt")
  return res.data.data.items
    .filter(item => item.projectStatus.id === 1)
    .map(item => ({
      id: item.projectNo,
      title: item.title,
      link: `https://tanifund.com/project/${item.urlSlug}`,
      interest: item.interestTarget,
      startAt: item.startAt,
      endAt: item.endAt,
      duration: dayDiff(item.endAt, item.startAt),
      returnType: item.returnPeriod.description,
    }));
}
