const getCount = (status) => report.executions.filter((execution) => execution.status === status).length;

const showCount = (status, element) => {
    const count = status === 'all' ? report.executions.length : getCount(status);
    const countElement = document.getElementById(element);
    countElement.innerText = count;
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'failed':
            return '❌';
        case 'skipped':
            return '⏭️';
        case 'interrupted':
            return '⏸️';
        case 'passed':
        default:
            return '✅';
    }
};

const renderExecutions = (executions) => {
    const report = document.getElementById('report');
    const list = document.createElement('ul');
    const groupedExecutions = new Map();
    executions.forEach((execution) => {
        if (groupedExecutions.has(execution.suite)) {
            groupedExecutions.get(execution.suite).push(execution);
        } else {
            groupedExecutions.set(execution.suite, [execution]);
        }
    });
    groupedExecutions.forEach((executions, suite) => {
        const item = document.createElement('li');
        item.classList.add('collapsible');
        const header = document.createElement('header');
        header.onclick = () => {
            item.classList.toggle('collapsed');
        };
        const areaTitle = document.createElement('span');
        areaTitle.innerText = suite;
        const toggleIcon = document.createElement('span');
        toggleIcon.classList.add('icon');
        toggleIcon.innerText = '▼';
        header.appendChild(toggleIcon);
        header.appendChild(areaTitle);
        item.appendChild(header);
        const sublist = document.createElement('ul');
        sublist.classList.add('content');
        executions.forEach((execution) => {
            const subitem = document.createElement('li');
            const subitemContent = document.createElement('div');
            subitemContent.classList.add('content');
            const statusIcon = document.createElement('div');
            statusIcon.classList.add('status-icon');
            statusIcon.innerText = getStatusIcon(execution.status);
            subitemContent.appendChild(statusIcon);
            const title = document.createElement('div');
            title.classList.add('title');
            title.innerText = execution.title;
            subitemContent.appendChild(title);
            const project = document.createElement('div');
            project.classList.add('project');
            const projectInnerText = document.createElement('div');
            projectInnerText.classList.add('inner');
            projectInnerText.innerText = execution.project;
            project.appendChild(projectInnerText);
            subitemContent.appendChild(project);
            const duration = document.createElement('div');
            duration.classList.add('duration');
            duration.innerText = execution.duration + 'ms';
            subitemContent.appendChild(duration);
            // subitemContent.innerText = getStatusIcon(execution.status) + ' ' + execution.title + ' (' + execution.duration + 'ms)';
            subitem.appendChild(subitemContent);
            sublist.appendChild(subitem);
        });
        item.appendChild(sublist);
        list.appendChild(item);
    });
    report.innerHTML = '';
    report.append(list);
};

const displayFiltered = (status) => {
    const filteredExecutions = status === 'all' ? report.executions : report.executions.filter((execution) => execution.status === status);
    renderExecutions(filteredExecutions);
};

const onLoaded = () => {
    showCount('all', 'all-count');
    showCount('passed', 'passed-count');
    showCount('failed', 'failed-count');
    showCount('skipped', 'skipped-count');
    showCount('interrupted', 'interrupted-count');
    displayFiltered('all');
};
