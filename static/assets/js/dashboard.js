// --- function.js ---

(function () {
  function initDashboardChart() {
    const canvas = document.getElementById('myChart');
    if (!canvas || typeof Chart === 'undefined') return;

    // Lấy JSON đã render từ template
    const monthsNode = document.getElementById('chart-months');
    const ordersNode = document.getElementById('chart-orders');

    let labels = [];
    let orders = [];
    try { labels = JSON.parse(monthsNode?.textContent || '[]'); } catch {}
    try { orders = JSON.parse(ordersNode?.textContent || '[]'); } catch {}

    // Nếu đã có chart gắn vào canvas → destroy để tránh lỗi "Canvas is already in use"
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    const data = {
      labels,
      datasets: [{
        label: canvas.dataset.label || 'Orders',
        backgroundColor: 'rgb(59, 183, 126)',
        borderColor: 'rgb(59, 183, 126)',
        data: orders
      }]
    };
    const options = { plugins: { tooltip: { enabled: false } }, hover: { mode: null } };

    new Chart(canvas, { type: 'bar', data, options });
  }

  // Chạy 1 lần khi DOM sẵn sàng
  if (!window.__DASHBOARD_CHART_INITED__) {
    window.__DASHBOARD_CHART_INITED__ = true;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDashboardChart, { once: true });
    } else {
      initDashboardChart();
    }
  }
})();
