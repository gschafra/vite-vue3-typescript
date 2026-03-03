<script setup lang="ts">
import { ref } from 'vue'
import type Popover from 'primevue/popover'

// ── Sidebar ──────────────────────────────────────────────────────────────────
const sidebarCollapsed = ref(false)
const toggleSidebar = () => (sidebarCollapsed.value = !sidebarCollapsed.value)

const navItems = [
  { label: 'Dashboard', icon: 'pi pi-home', active: true },
  { label: 'Analytics', icon: 'pi pi-chart-bar', active: false },
  { label: 'Users', icon: 'pi pi-users', active: false },
  { label: 'Orders', icon: 'pi pi-shopping-cart', active: false },
  { label: 'Products', icon: 'pi pi-box', active: false },
  { label: 'Reports', icon: 'pi pi-file-pdf', active: false },
  { label: 'Settings', icon: 'pi pi-cog', active: false },
]

const activeNav = ref('Dashboard')
const setActive = (label: string) => (activeNav.value = label)

// ── Notifications ─────────────────────────────────────────────────────────────
const notifPanel = ref<InstanceType<typeof Popover>>()
const toggleNotifications = (event: Event) => notifPanel.value?.toggle(event)

const notifications = ref([
  { id: 1, icon: 'pi pi-user-plus', iconBg: 'bg-primary', message: 'New user registered', time: '2 min ago', read: false },
  { id: 2, icon: 'pi pi-shopping-cart', iconBg: 'bg-green-500', message: 'Order #4821 was placed', time: '15 min ago', read: false },
  { id: 3, icon: 'pi pi-exclamation-triangle', iconBg: 'bg-orange-500', message: 'Server CPU usage above 85%', time: '1 hour ago', read: false },
  { id: 4, icon: 'pi pi-check-circle', iconBg: 'bg-teal-500', message: 'Backup completed successfully', time: '3 hours ago', read: true },
])

const unreadCount = ref(notifications.value.filter(n => !n.read).length)

const markAllRead = () => {
  notifications.value.forEach(n => (n.read = true))
  unreadCount.value = 0
}

// ── Stats cards ───────────────────────────────────────────────────────────────
const stats = [
  { label: 'Total Revenue', value: '$48,295', change: '+12.4%', positive: true, icon: 'pi pi-dollar', color: 'bg-primary' },
  { label: 'Active Users', value: '1,284', change: '+8.2%', positive: true, icon: 'pi pi-users', color: 'bg-green-500' },
  { label: 'New Orders', value: '89', change: '+3.1%', positive: true, icon: 'pi pi-shopping-cart', color: 'bg-orange-500' },
  { label: 'Support Tickets', value: '12', change: '-5.0%', positive: false, icon: 'pi pi-ticket', color: 'bg-red-500' },
]

// ── Recent orders table ───────────────────────────────────────────────────────
const orders = ref([
  { id: '#4821', customer: 'Alice Johnson', product: 'Pro License', amount: '$299.00', status: 'Completed' },
  { id: '#4820', customer: 'Bob Martinez', product: 'Starter Pack', amount: '$49.00', status: 'Processing' },
  { id: '#4819', customer: 'Carol White', product: 'Enterprise Plan', amount: '$999.00', status: 'Completed' },
  { id: '#4818', customer: 'David Kim', product: 'Add-on Bundle', amount: '$79.00', status: 'Pending' },
  { id: '#4817', customer: 'Eva Brown', product: 'Pro License', amount: '$299.00', status: 'Cancelled' },
])

const statusSeverity = (status: string) => {
  const map: Record<string, string> = {
    Completed: 'success',
    Processing: 'info',
    Pending: 'warn',
    Cancelled: 'danger',
  }
  return map[status] ?? 'secondary'
}

// ── Activity feed ─────────────────────────────────────────────────────────────
const activities = [
  { icon: 'pi pi-user', color: 'var(--p-primary-color)', label: 'Alice Johnson signed up', time: '2 min ago' },
  { icon: 'pi pi-shopping-cart', color: 'var(--p-green-500)', label: 'Order #4821 placed by Bob', time: '15 min ago' },
  { icon: 'pi pi-file-edit', color: 'var(--p-orange-500)', label: 'Report Q1-2026 updated', time: '42 min ago' },
  { icon: 'pi pi-shield', color: 'var(--p-teal-500)', label: '2FA enabled for Carol White', time: '1 hr ago' },
  { icon: 'pi pi-trash', color: 'var(--p-red-500)', label: 'Product SKU-7841 deleted', time: '3 hr ago' },
  { icon: 'pi pi-check-circle', color: 'var(--p-green-500)', label: 'Monthly backup completed', time: '5 hr ago' },
]

// ── App meta ──────────────────────────────────────────────────────────────────
const appName = 'AdminHub'
const appVersion = 'v1.0.0'
</script>

<template>
  <div class="dashboard-shell">

    <!-- ═══════════════════════════════════════════════════ SIDEBAR ═══════ -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">

      <!-- Logo / brand -->
      <div class="sidebar-header">
        <span v-if="!sidebarCollapsed" class="brand-name">
          <i class="pi pi-th-large brand-icon" />
          {{ appName }}
        </span>
        <i v-else class="pi pi-th-large brand-icon" />
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        <button
          v-for="item in navItems"
          :key="item.label"
          class="nav-item"
          :class="{ active: activeNav === item.label }"
          :title="sidebarCollapsed ? item.label : ''"
          @click="setActive(item.label)"
        >
          <i :class="item.icon" class="nav-icon" />
          <span v-if="!sidebarCollapsed" class="nav-label">{{ item.label }}</span>
        </button>
      </nav>

      <!-- App info at the bottom -->
      <div class="sidebar-footer">
        <Divider />
        <div class="app-info" :class="{ centered: sidebarCollapsed }">
          <i class="pi pi-info-circle" style="font-size: 0.85rem; opacity: 0.6" />
          <span v-if="!sidebarCollapsed" class="app-info-text">
            {{ appName }} <strong>{{ appVersion }}</strong>
          </span>
        </div>
      </div>
    </aside>

    <!-- ══════════════════════════════════════════════ MAIN COLUMN ════════ -->
    <div class="main-column">

      <!-- ─────────────────────────────────────────── TOP BAR ───────────── -->
      <header class="topbar">
        <!-- Left: toggle + title -->
        <div class="topbar-left">
          <Button
            icon="pi pi-bars"
            text
            rounded
            severity="secondary"
            aria-label="Toggle sidebar"
            @click="toggleSidebar"
          />
          <span class="topbar-title">Dashboard</span>
        </div>

        <!-- Right: notifications + avatar -->
        <div class="topbar-right">

          <!-- Notification bell -->
          <OverlayBadge :value="unreadCount > 0 ? String(unreadCount) : ''" severity="danger">
            <Button
              icon="pi pi-bell"
              text
              rounded
              severity="secondary"
              aria-label="Notifications"
              @click="toggleNotifications"
            />
          </OverlayBadge>

          <!-- Notification popover -->
          <Popover ref="notifPanel">
            <div class="notif-panel">
              <div class="notif-header">
                <span class="notif-title">Notifications</span>
                <Button label="Mark all read" text size="small" @click="markAllRead" />
              </div>
              <ul class="notif-list">
                <li
                  v-for="n in notifications"
                  :key="n.id"
                  class="notif-item"
                  :class="{ unread: !n.read }"
                >
                  <span class="notif-icon-wrap" :class="n.iconBg">
                    <i :class="n.icon" />
                  </span>
                  <div class="notif-body">
                    <p class="notif-message">{{ n.message }}</p>
                    <p class="notif-time">{{ n.time }}</p>
                  </div>
                </li>
              </ul>
              <div class="notif-footer">
                <Button label="View all notifications" text size="small" fluid />
              </div>
            </div>
          </Popover>

          <!-- Avatar -->
          <div class="avatar-wrap">
            <Avatar label="AJ" shape="circle" size="normal" style="background-color: var(--p-primary-color); color: #fff; cursor: pointer;" />
            <span class="avatar-name">Alice Johnson</span>
          </div>
        </div>
      </header>

      <!-- ──────────────────────────────────────── CONTENT AREA ─────────── -->
      <main class="content-area">

        <!-- Welcome bar -->
        <div class="welcome-bar">
          <div>
            <h2 class="welcome-heading">Good morning, Alice 👋</h2>
            <p class="welcome-sub">Here's what's happening with your store today.</p>
          </div>
          <Button label="Download Report" icon="pi pi-download" size="small" />
        </div>

        <!-- ── Stat cards ── -->
        <div class="stats-grid">
          <Card v-for="stat in stats" :key="stat.label" class="stat-card">
            <template #content>
              <div class="stat-inner">
                <div class="stat-text">
                  <p class="stat-label">{{ stat.label }}</p>
                  <p class="stat-value">{{ stat.value }}</p>
                  <p class="stat-change" :class="stat.positive ? 'text-green-500' : 'text-red-500'">
                    <i :class="stat.positive ? 'pi pi-arrow-up' : 'pi pi-arrow-down'" style="font-size: 0.75rem;" />
                    {{ stat.change }} vs last month
                  </p>
                </div>
                <span class="stat-icon-wrap" :class="stat.color">
                  <i :class="stat.icon" />
                </span>
              </div>
            </template>
          </Card>
        </div>

        <!-- ── Bottom two columns ── -->
        <div class="bottom-grid">

          <!-- Recent orders -->
          <Card class="orders-card">
            <template #header>
              <div class="card-header-row">
                <span class="card-heading">Recent Orders</span>
                <Button label="View all" text size="small" icon="pi pi-arrow-right" icon-pos="right" />
              </div>
            </template>
            <template #content>
              <DataTable :value="orders" size="small" :striped-rows="true">
                <Column field="id" header="Order" style="width: 5rem;" />
                <Column field="customer" header="Customer" />
                <Column field="product" header="Product" class="hide-sm" />
                <Column field="amount" header="Amount" style="width: 7rem;" />
                <Column header="Status" style="width: 8rem;">
                  <template #body="{ data }">
                    <Tag :value="data.status" :severity="statusSeverity(data.status)" />
                  </template>
                </Column>
              </DataTable>
            </template>
          </Card>

          <!-- Activity feed -->
          <Card class="activity-card">
            <template #header>
              <div class="card-header-row">
                <span class="card-heading">Recent Activity</span>
              </div>
            </template>
            <template #content>
              <ul class="activity-list">
                <li v-for="(act, i) in activities" :key="i" class="activity-item">
                  <span class="activity-dot" :style="{ background: act.color }">
                    <i :class="act.icon" />
                  </span>
                  <div class="activity-body">
                    <p class="activity-label">{{ act.label }}</p>
                    <p class="activity-time">{{ act.time }}</p>
                  </div>
                </li>
              </ul>
            </template>
          </Card>

        </div>
      </main>
    </div><!-- /main-column -->

  </div><!-- /dashboard-shell -->
</template>

<style scoped>
/* ─── Reset / shell ───────────────────────────────────────────────────────── */
.dashboard-shell {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  inset: 0;
  background: var(--p-surface-50, #f8f9fa);
  font-family: inherit;
  text-align: left;
}

/* ─── Sidebar ─────────────────────────────────────────────────────────────── */
.sidebar {
  width: 15rem;
  min-width: 15rem;
  background: var(--p-surface-0, #fff);
  border-right: 1px solid var(--p-surface-200, #e2e8f0);
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease, min-width 0.25s ease;
  overflow: hidden;
}
.sidebar.collapsed {
  width: 3.75rem;
  min-width: 3.75rem;
}

.sidebar-header {
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid var(--p-surface-200, #e2e8f0);
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--p-primary-color);
  white-space: nowrap;
  overflow: hidden;
}

.brand-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  color: var(--p-primary-color);
}

.brand-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
}

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 0.375rem;
  margin: 0.1rem 0.5rem;
  color: var(--p-text-color, #374151);
  font-size: 0.9rem;
  white-space: nowrap;
  transition: background 0.15s, color 0.15s;
}
.nav-item:hover {
  background: var(--p-surface-100, #f1f5f9);
}
.nav-item.active {
  background: color-mix(in srgb, var(--p-primary-color) 12%, transparent);
  color: var(--p-primary-color);
  font-weight: 600;
}

.nav-icon {
  font-size: 1rem;
  flex-shrink: 0;
}
.nav-label {
  overflow: hidden;
}

/* ─── Sidebar footer ─────────────────────────────────────────────────────── */
.sidebar-footer {
  padding: 0 0.5rem 0.75rem;
}

.app-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  font-size: 0.78rem;
  color: var(--p-text-muted-color, #6b7280);
  overflow: hidden;
  white-space: nowrap;
}
.app-info.centered {
  justify-content: center;
}
.app-info-text {
  overflow: hidden;
}

/* ─── Main column ─────────────────────────────────────────────────────────── */
.main-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ─── Topbar ──────────────────────────────────────────────────────────────── */
.topbar {
  height: 4rem;
  min-height: 4rem;
  background: var(--p-surface-0, #fff);
  border-bottom: 1px solid var(--p-surface-200, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  gap: 1rem;
}

.topbar-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.topbar-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--p-text-color);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.avatar-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.25rem;
}
.avatar-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--p-text-color);
}

/* ─── Notification popover ────────────────────────────────────────────────── */
.notif-panel {
  width: 22rem;
  max-width: 90vw;
}
.notif-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.25rem 0.25rem;
}
.notif-title {
  font-weight: 700;
  font-size: 0.95rem;
}
.notif-list {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0;
  max-height: 18rem;
  overflow-y: auto;
}
.notif-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.6rem 0.25rem;
  border-radius: 0.375rem;
  transition: background 0.15s;
}
.notif-item:hover {
  background: var(--p-surface-50, #f8f9fa);
}
.notif-item.unread {
  background: color-mix(in srgb, var(--p-primary-color) 6%, transparent);
}
.notif-icon-wrap {
  width: 2.25rem;
  height: 2.25rem;
  min-width: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.85rem;
}
.notif-body {
  flex: 1;
  min-width: 0;
}
.notif-message {
  margin: 0;
  font-size: 0.86rem;
  color: var(--p-text-color);
  line-height: 1.3;
}
.notif-time {
  margin: 0.2rem 0 0;
  font-size: 0.75rem;
  color: var(--p-text-muted-color, #6b7280);
}
.notif-footer {
  padding-top: 0.25rem;
  border-top: 1px solid var(--p-surface-200, #e2e8f0);
}

/* ─── Content area ────────────────────────────────────────────────────────── */
.content-area {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ─── Welcome bar ─────────────────────────────────────────────────────────── */
.welcome-bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.welcome-heading {
  margin: 0 0 0.25rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--p-text-color);
}
.welcome-sub {
  margin: 0;
  font-size: 0.9rem;
  color: var(--p-text-muted-color, #6b7280);
}

/* ─── Stats grid ──────────────────────────────────────────────────────────── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-card {
  border-radius: 0.75rem;
}

.stat-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.stat-label {
  margin: 0 0 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--p-text-muted-color, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.stat-value {
  margin: 0 0 0.25rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--p-text-color);
  line-height: 1.2;
}
.stat-change {
  margin: 0;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.2rem;
}
.stat-icon-wrap {
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.3rem;
}

/* ─── Bottom grid ─────────────────────────────────────────────────────────── */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 22rem;
  gap: 1rem;
  align-items: start;
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0;
}
.card-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--p-text-color);
}

/* ─── Activity list ───────────────────────────────────────────────────────── */
.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.activity-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}
.activity-dot {
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.75rem;
}
.activity-body {
  flex: 1;
}
.activity-label {
  margin: 0;
  font-size: 0.85rem;
  color: var(--p-text-color);
  line-height: 1.3;
}
.activity-time {
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: var(--p-text-muted-color, #6b7280);
}

/* ─── Responsive breakpoints ──────────────────────────────────────────────── */
@media (max-width: 1100px) {
  .bottom-grid {
    grid-template-columns: 1fr;
  }
  .activity-card {
    order: -1;
  }
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .avatar-name,
  .topbar-title {
    display: none;
  }
  .content-area {
    padding: 1rem;
  }
}
</style>
