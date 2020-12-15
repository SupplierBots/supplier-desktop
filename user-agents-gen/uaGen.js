const UserAgent = require('user-agents');
const { parse } = require('useragent');
const fs = require('fs');

function gen() {
  return new UserAgent(data => {
    const os = parse(data.userAgent).os;
    const device = parse(data.userAgent).device;
    return device.family === 'iPhone' && parseInt(os.major, 10) > 11;
  }).data;
}

const agents = JSON.parse(fs.readFileSync('./userAgents.json', { encoding: 'utf8' }));
var max = 1000;
for (let i = 0; i < max; i++) {
  const agent = gen();
  if (agents.some(a => a.userAgent === agent.userAgent)) {
    console.log(`${i + 1}/${max} (${agents.length})`);
    continue;
  }
  agents.push(agent);
  fs.writeFileSync('./userAgents.json', JSON.stringify(agents, null, 2));
  console.log(`${i + 1}/${max} (${agents.length})`);
}
