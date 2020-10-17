const fs = require('fs');
const https = require('https');
const xml = require('xml2js');

const template = fs.readFileSync('./template.md', 'utf-8');
let rss = '';

https.get('https://john.colagioia.net/blog/feed.xml', (res) => {
  res.on('data', (d) => {
    rss += d.toString();
  });
  res.on('end', () => {
    const feed = xml.parseString(rss, (err, res) => {
      const entries = res.feed.entry;
      let table = '';

      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const title = entry.link[0]['$'].title;
        const url = entry.link[0]['$'].href;
        const summary = entry.summary[0]._;
        const published = new Date(entry.published[0]);
        const lastWeek = new Date();

        lastWeek.setDate(lastWeek.getDate() - 11);
        lastWeek.setHours(0);
        if (published > lastWeek) {
          table += `|[${title}](${url})|${published.toDateString()}|\n`;
        }
      }

      const result = template.replace('<!--BlogPostsHere-->', table.trim());
      fs.writeFileSync('./README.md', result);
    });
  });
  res.on('error', (e) => {
    console.log(e);
  });
});

