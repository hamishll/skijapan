// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

// Close mobile menu on link click
links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('open');
  });
});

// Active nav highlighting on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });

sections.forEach(section => observer.observe(section));

// === Season Chart ===
const weekData = [
  {
    label: 'Dec 21–27', month: 'Dec',
    snow: 78, sunny: 12, temp: '-6°C',
    crowd: 'high', crowdLabel: 'Busy',
    holidays: ['🇯🇵 Year-end holidays begin', '🇬🇧 Christmas break (~Dec 18–Jan 4)', '🇦🇺 Summer holidays (from ~Dec 18)', '🇸🇬 School holidays (from ~Dec 12)', '🇭🇰 Christmas break (~Dec 18–Jan 4)', '🇰🇷 Winter vacation (from ~Dec 21)'],
    notes: 'Season building — this is historically the snowiest week in Niseko (avg 53cm at mid-elevation). Base developing fast. Crowds building as Christmas breaks start worldwide. Avg 2.9 hrs sunshine/day in Niseko, ~4 hrs in Hakuba. Myoko/Nozawa avg ~63cm snowfall this week.'
  },
  {
    label: 'Dec 28–Jan 3', month: 'Dec/Jan',
    snow: 82, sunny: 10, temp: '-7°C',
    crowd: 'peak', crowdLabel: 'Peak',
    holidays: ['🇯🇵 Oshogatsu/New Year (Dec 29–Jan 3)', '🇬🇧 Christmas break', '🇦🇺 Summer holidays (all states)', '🇸🇬 School holidays', '🇭🇰 Christmas break', '🇰🇷 Winter vacation', '🇹🇼 Winter break'],
    notes: 'Busiest week of the entire season. Japanese Oshogatsu + UK Christmas + Aussie summer + Singapore/HK/Korea/Taiwan winter breaks all overlap. Nozawa averages 89cm snowfall this week alone. Expect queues, premium pricing, and fully booked accommodation across all resorts.'
  },
  {
    label: 'Jan 4–10', month: 'Jan',
    snow: 92, sunny: 12, temp: '-8°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇦🇺 Summer holidays (most states until late Jan–early Feb)', '🇰🇷 Winter vacation continues'],
    notes: 'Japanese holidays end Jan 3 — domestic crowds drop sharply. Snowfall ramping up to peak levels. Aussie crowds still significant (holidays run to late Jan). Singapore/HK schools resume. ~3.3 hrs sunshine/day (Niseko). Hakuba gets ~4 hrs sun. Great week for value.'
  },
  {
    label: 'Jan 11–17', month: 'Jan',
    snow: 98, sunny: 13, temp: '-9°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇯🇵 Coming of Age Day (Jan 11 — Monday)', '🇦🇺 Summer holidays continue'],
    notes: 'Peak snowfall zone begins. Week 2 of January is the snowiest week at Hakuba (avg 76cm at Hakuba 47), Nozawa (avg 72cm), and Myoko (avg 74cm at Suginohara). Japanese 3-day weekend around Coming of Age Day. Aussie crowds still present. Snow depth reaching 200–300cm at Niseko.'
  },
  {
    label: 'Jan 18–24', month: 'Jan',
    snow: 100, sunny: 14, temp: '-9°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: ['🇦🇺 Summer holidays winding down (VIC ends ~Jan 26)'],
    notes: 'THE SWEET SPOT. Peak powder conditions continue — Niseko averages ~100cm/week, Myoko ~88cm/week. All major holidays finished except tail end of Aussie summer. Chinese New Year not until Feb 6. Book this week if you can. Coldest temperatures of the season (-7°C day, -12°C night at Niseko).',
    recommended: true
  },
  {
    label: 'Jan 25–31', month: 'Jan',
    snow: 100, sunny: 14, temp: '-9°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: ['🇦🇺 Most summer holidays ending (NSW/TAS to ~Feb 3, ACT to ~Feb 1)'],
    notes: 'Another excellent week. Deepest snowpack of the season building — snow depth up to 300cm+ at Niseko, 400cm+ at Nozawa upper slopes. Aussie holidays wrapping up. Still 6 days before Chinese New Year. Outstanding powder-to-crowd ratio.',
    recommended: true
  },
  {
    label: 'Feb 1–5', month: 'Feb',
    snow: 90, sunny: 16, temp: '-8°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇦🇺 Last summer holidays ending (NSW/TAS ~Feb 3)', 'Pre-CNY arrivals building'],
    notes: 'Last quiet window before Chinese New Year hits Feb 6. Snow still excellent — Niseko avg ~270cm total for February. Early CNY travellers starting to arrive at Niseko. Book restaurants in advance. Myoko/Nozawa still quiet.'
  },
  {
    label: 'Feb 6–12', month: 'Feb',
    snow: 88, sunny: 16, temp: '-7°C',
    crowd: 'peak', crowdLabel: 'Peak',
    holidays: ['🇨🇳 Chinese New Year Golden Week (Feb 6–12)', '🇰🇷 Seollal (Feb 6–8)', '🇹🇼 Lunar New Year (~Feb 14–17 but travel starts early)', '🇻🇳 Tet holiday', '🇯🇵 National Foundation Day (Feb 11)'],
    notes: 'Triple whammy: Chinese New Year Golden Week + Korean Seollal + Japanese Foundation Day. Niseko is packed — Chinese and SE Asian visitors surge. Nozawa avg 76cm this week. Hakuba sees 38–39cm mid-elevation. Myoko and Nozawa less affected by CNY crowds but Foundation Day brings Japanese domestic visitors.'
  },
  {
    label: 'Feb 13–19', month: 'Feb',
    snow: 82, sunny: 18, temp: '-6°C',
    crowd: 'high', crowdLabel: 'Busy',
    holidays: ['🇬🇧 Half Term (Feb 15–19 most areas)', '🇨🇳 CNY Golden Week tail end', '🇹🇼 Lunar New Year holidays (~Feb 14–17)'],
    notes: 'UK half term overlaps with CNY tail and Taiwan Lunar New Year. Niseko and Hakuba busy with British families and remaining Chinese/Taiwanese visitors. Snow still good — more sunny days appearing (~3 hrs/day sun Niseko). Myoko reports February gets ~2/3 of January snowfall but with more bluebird days.'
  },
  {
    label: 'Feb 20–26', month: 'Feb',
    snow: 75, sunny: 20, temp: '-5°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇯🇵 Emperor\'s Birthday (Feb 23 — Tuesday)'],
    notes: 'Crowds ease significantly post-half-term and post-CNY. Emperor\'s Birthday creates a Japanese day off. Snow still reliable — Nozawa avg 32cm this week, base depth 350–400cm. More sunny days appearing. Sweet spot for value with still-excellent snow.'
  },
  {
    label: 'Feb 27–Mar 5', month: 'Feb/Mar',
    snow: 65, sunny: 24, temp: '-4°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'Late season value window. Deep base from months of accumulation (300–500cm at upper elevations). Niseko avg 28cm/week in early March with 5.3 snowy days. Hakuba still gets 39cm. Warmer days, spring feel starting. Fewer crowds everywhere.'
  },
  {
    label: 'Mar 6–12', month: 'Mar',
    snow: 55, sunny: 28, temp: '-3°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: ['Hakuba Snow Machine Festival (if scheduled ~early Mar)'],
    notes: 'Spring skiing begins with more bluebird days — roughly 1 perfect sunny day per week in Niseko. Hakuba may host Snow Machine festival bringing village crowds. Sunny groomers in the morning, soft snow in the afternoon. Great value, 20–30% off peak accommodation.',
    recommended: true
  },
  {
    label: 'Mar 13–19', month: 'Mar',
    snow: 45, sunny: 30, temp: '-1°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'Spring conditions with plenty of snow on the ground from the deep base. Ideal for those who prefer sunshine and value over deep powder. Longest days of the ski season so far. Temperatures rising above freezing at base in afternoons.'
  },
  {
    label: 'Mar 20–26', month: 'Mar',
    snow: 35, sunny: 30, temp: '0°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇯🇵 Vernal Equinox Day (Mar 20 — Saturday)', '🇬🇧 Easter break begins (~Mar 26)'],
    notes: 'Japanese holiday weekend brings domestic crowds. UK Easter holidays start late this week (Easter Sunday is Mar 28). Spring snow — corn snow and slush lower down, still decent up top. Some smaller resorts start closing.'
  },
  {
    label: 'Mar 27–31', month: 'Mar',
    snow: 25, sunny: 32, temp: '1°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇬🇧 Easter holidays (Mar 26–Apr 9)', '🇯🇵 Easter weekend (Mar 28)'],
    notes: 'Easter week brings some UK families. End of season approaching. Larger resorts (Niseko, Hakuba, Nozawa) still operating — Nozawa often open until May. Bargain prices but slushy afternoons. Upper mountain still skiable.'
  }
];

function renderChart() {
  const grid = document.getElementById('chart-grid');
  const detail = document.getElementById('week-detail');
  grid.innerHTML = '';

  weekData.forEach((week, i) => {
    const col = document.createElement('div');
    col.className = 'chart-week' + (week.recommended ? ' recommended' : '');
    col.setAttribute('role', 'button');
    col.setAttribute('tabindex', '0');

    const snowH = Math.round(week.snow * 0.7);
    const sunnyH = Math.round(week.sunny * 1.8);

    col.innerHTML = `
      <span class="week-label">${week.label.split('–')[0].replace(/\s/g, '\u00A0')}</span>
      <div class="bar-group">
        <div class="snow-col" style="height:${snowH}px" title="Snow: ${week.snow}%"></div>
        <div class="sunny-col" style="height:${sunnyH}px" title="Sunny: ${week.sunny}%"></div>
      </div>
      <div class="crowd-indicator crowd-${week.crowd}" title="Crowds: ${week.crowdLabel}"></div>
    `;

    col.addEventListener('click', () => showWeekDetail(i, col));
    col.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showWeekDetail(i, col);
      }
    });
    grid.appendChild(col);
  });
}

function showWeekDetail(index, el) {
  const week = weekData[index];
  const detail = document.getElementById('week-detail');

  document.querySelectorAll('.chart-week').forEach(w => w.classList.remove('active'));
  el.classList.add('active');

  const holidayTags = week.holidays.length > 0
    ? week.holidays.map(h => `<span class="holiday-tag">${h}</span>`).join('')
    : '<span class="holiday-tag good">No major holidays</span>';

  detail.innerHTML = `
    <h4>${week.label} <span style="font-weight:400;color:var(--text-light);font-size:0.9rem">${week.recommended ? '— Recommended' : ''}</span></h4>
    <div class="week-detail-stats">
      <span class="week-detail-stat"><strong>Snow:</strong> ${week.snow >= 90 ? 'Heavy' : week.snow >= 65 ? 'Good' : week.snow >= 40 ? 'Moderate' : 'Light'} (${week.snow}%)</span>
      <span class="week-detail-stat"><strong>Sun:</strong> ~${week.sunny}% clear days</span>
      <span class="week-detail-stat"><strong>Temp:</strong> ${week.temp} avg</span>
      <span class="week-detail-stat"><strong>Crowds:</strong> ${week.crowdLabel}</span>
    </div>
    <div class="week-detail-holidays">${holidayTags}</div>
    <p style="margin-top:0.6rem;font-size:0.9rem;color:var(--text-light)">${week.notes}</p>
  `;
}

renderChart();
