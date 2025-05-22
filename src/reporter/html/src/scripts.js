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
    executions.forEach((execution) => {
        const item = document.createElement('li');
        item.innerText = getStatusIcon(execution.status) + ' ' + execution.title + ' (' + execution.duration + 'ms)';
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
