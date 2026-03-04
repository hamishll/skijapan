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
    snow: 75, sunny: 15, temp: '-6°C',
    crowd: 'high', crowdLabel: 'Busy',
    holidays: ['🇯🇵 Year-end holidays begin', '🇬🇧 Christmas break', '🇦🇺 Summer holidays'],
    notes: 'Season building. Snow base developing, early-season powder. Crowds build toward Christmas and New Year.'
  },
  {
    label: 'Dec 28–Jan 3', month: 'Dec/Jan',
    snow: 80, sunny: 12, temp: '-7°C',
    crowd: 'peak', crowdLabel: 'Peak',
    holidays: ['🇯🇵 Oshogatsu (New Year)', '🇬🇧 Christmas break', '🇦🇺 Summer holidays'],
    notes: 'New Year week — busiest week of the season across all resorts. Japanese, British, and Australian holidays overlap. Expect queues and premium pricing.'
  },
  {
    label: 'Jan 4–10', month: 'Jan',
    snow: 90, sunny: 14, temp: '-8°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇦🇺 Summer holidays (winding down)'],
    notes: 'Japanese holidays end, crowds thin. Snowfall ramping up to peak levels. Great week if you can get time off.'
  },
  {
    label: 'Jan 11–17', month: 'Jan',
    snow: 95, sunny: 16, temp: '-8°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇯🇵 Coming of Age Day (Jan 11)', '🇦🇺 Summer holidays end ~Jan 28'],
    notes: 'Peak snowfall begins. Japanese long weekend around Coming of Age Day. Aussie crowds still present but thinning.'
  },
  {
    label: 'Jan 18–24', month: 'Jan',
    snow: 100, sunny: 16, temp: '-9°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'THE SWEET SPOT. Peak powder, minimal crowds. All major holidays finished, next wave not yet started. Book this week if you can.',
    recommended: true
  },
  {
    label: 'Jan 25–31', month: 'Jan',
    snow: 100, sunny: 15, temp: '-9°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'Another excellent week. Deepest snowpack of the season building. Still before Chinese New Year rush. Outstanding value.',
    recommended: true
  },
  {
    label: 'Feb 1–5', month: 'Feb',
    snow: 92, sunny: 18, temp: '-8°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['Pre-CNY arrivals building'],
    notes: 'Last quiet window before Chinese New Year. Snow still excellent. Early CNY travellers start arriving at Niseko.'
  },
  {
    label: 'Feb 6–12', month: 'Feb',
    snow: 88, sunny: 18, temp: '-7°C',
    crowd: 'peak', crowdLabel: 'Peak',
    holidays: ['🇨🇳 Chinese New Year (Feb 6)', '🇰🇷 Seollal (Feb 6–8)', '🇯🇵 Foundation Day (Feb 11)'],
    notes: 'Chinese New Year Golden Week + Korean Seollal + Japanese Foundation Day. Triple whammy. Niseko is packed. Myoko and Nozawa less affected but still busier.'
  },
  {
    label: 'Feb 13–19', month: 'Feb',
    snow: 82, sunny: 20, temp: '-6°C',
    crowd: 'high', crowdLabel: 'Busy',
    holidays: ['🇬🇧 Half Term (Feb 15–19)', '🇨🇳 CNY tail end'],
    notes: 'UK half term overlaps with CNY tail. Niseko and Hakuba busy with British and remaining Chinese visitors. Good snow but crowded.'
  },
  {
    label: 'Feb 20–26', month: 'Feb',
    snow: 75, sunny: 22, temp: '-5°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: [],
    notes: 'Crowds ease post-half-term. Snow still good but starting to transition. More sunny days appearing. Pleasant skiing.'
  },
  {
    label: 'Feb 27–Mar 5', month: 'Feb/Mar',
    snow: 65, sunny: 24, temp: '-4°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'Late season value window. Base is deep from months of accumulation. Warmer days, spring feel starting. Fewer crowds.'
  },
  {
    label: 'Mar 6–12', month: 'Mar',
    snow: 55, sunny: 26, temp: '-3°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'Spring skiing begins. Sunny groomers in the morning, soft snow in the afternoon. Great value, empty slopes, longer days.',
    recommended: true
  },
  {
    label: 'Mar 13–19', month: 'Mar',
    snow: 45, sunny: 28, temp: '-1°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'Spring conditions. Still plenty of snow on the ground from the deep base. Ideal for those who prefer sunshine and value over deep powder.'
  },
  {
    label: 'Mar 20–26', month: 'Mar',
    snow: 35, sunny: 28, temp: '0°C',
    crowd: 'med', crowdLabel: 'Moderate',
    holidays: ['🇯🇵 Vernal Equinox (Mar 20)'],
    notes: 'Japanese holiday weekend brings domestic crowds. Spring snow — corn snow and slush lower down, still decent up top. Some resorts start closing.'
  },
  {
    label: 'Mar 27–31', month: 'Mar',
    snow: 25, sunny: 28, temp: '1°C',
    crowd: 'low', crowdLabel: 'Quiet',
    holidays: [],
    notes: 'End of season. Many smaller resorts closed. Larger resorts (Niseko, Hakuba) still operating. Bargain prices, slushy afternoons.'
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
