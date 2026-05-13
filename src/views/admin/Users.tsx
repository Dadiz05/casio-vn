'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { Shield, Trash2, User, UserPlus } from 'lucide-react'
import { useStore } from '@/store/useStore'
import type { UserRole } from '@/types'

type UserForm = {
  name: string
  email: string
  role: UserRole
}

export default function AdminUsers() {
  const { user: currentUser, users, addUser, deleteUser, updateUser } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [newUser, setNewUser] = useState<UserForm>({
    name: '',
    email: '',
    role: 'user',
  })

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return users

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    )
  }, [searchQuery, users])

  const handleAddUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newUser.name || !newUser.email) return

    addUser({
      id: Date.now().toString(),
      ...newUser,
      createdAt: new Date().toISOString(),
      status: 'active',
    })
    setNewUser({ name: '', email: '', role: 'user' })
    setShowAddForm(false)
  }

  const getRoleBadge = (role: UserRole) =>
    role === 'admin' ? (
      <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(221,51,51,0.12)] px-3 py-1 text-sm font-medium text-[var(--color-surface-raised)]">
        <Shield size={14} />
        Admin
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(16,4,4,0.08)] px-3 py-1 text-sm font-medium text-[var(--color-text-secondary)]">
        <User size={14} />
        User
      </span>
    )

  return (
    <div className="casio-container casio-section py-10 page-fade">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="site-kicker">Admin users</span>
          <h1 className="site-title mt-2 text-3xl sm:text-4xl">Quản lý người dùng</h1>
          <p className="site-copy mt-2">Quản lý tài khoản khách hàng và quyền quản trị.</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="site-button site-button--primary">
          <UserPlus size={18} />
          Thêm người dùng
        </button>
      </div>

      <div className="site-card mb-8 p-4 sm:p-5">
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="site-field"
          placeholder="Tìm theo tên, email hoặc vai trò"
        />
      </div>

      {showAddForm && (
        <div className="site-card mb-8 p-6 sm:p-8">
          <h2 className="mb-6 text-2xl font-semibold text-[var(--color-text-primary)]">
            Thêm người dùng mới
          </h2>
          <form onSubmit={handleAddUser} className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <input
              type="text"
              value={newUser.name}
              onChange={(event) => setNewUser({ ...newUser, name: event.target.value })}
              className="site-field"
              placeholder="Họ tên"
              required
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(event) => setNewUser({ ...newUser, email: event.target.value })}
              className="site-field"
              placeholder="Email"
              required
            />
            <select
              value={newUser.role}
              onChange={(event) => setNewUser({ ...newUser, role: event.target.value as UserRole })}
              className="site-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex flex-col gap-3 md:col-span-3 sm:flex-row">
              <button type="submit" className="site-button site-button--primary flex-1">
                Thêm người dùng
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="site-button site-button--secondary flex-1"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="site-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead className="border-b border-[var(--color-border-strong)] bg-[rgba(16,4,4,0.04)]">
              <tr>
                <th className="p-5 text-left font-semibold">Người dùng</th>
                <th className="p-5 text-left font-semibold">Email</th>
                <th className="p-5 text-center font-semibold">Vai trò</th>
                <th className="p-5 text-center font-semibold">Ngày tham gia</th>
                <th className="p-5 text-center font-semibold">Trạng thái</th>
                <th className="p-5 text-center font-semibold">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[var(--color-border-strong)] transition hover:bg-[rgba(16,4,4,0.02)]"
                >
                  <td className="p-5 font-medium text-[var(--color-text-primary)]">{user.name}</td>
                  <td className="p-5 text-[var(--color-text-secondary)]">{user.email}</td>
                  <td className="p-5 text-center">{getRoleBadge(user.role)}</td>
                  <td className="p-5 text-center text-[var(--color-text-secondary)]">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : '-'}
                  </td>
                  <td className="p-5 text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                        user.status === 'active'
                          ? 'bg-[rgba(34,197,94,0.15)] text-green-700'
                          : 'bg-[rgba(16,4,4,0.08)] text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {user.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          updateUser(user.id, {
                            status: user.status === 'active' ? 'inactive' : 'active',
                          })
                        }
                        className="site-button site-button--ghost min-h-10 px-3 py-2"
                      >
                        {user.status === 'active' ? 'Khóa' : 'Mở'}
                      </button>

                      {user.id !== currentUser?.id && (
                        <button
                          onClick={() => {
                            if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
                              deleteUser(user.id)
                            }
                          }}
                          className="site-button site-button--ghost min-h-10 px-3 py-2 text-[var(--color-surface-raised)]"
                          title="Xóa người dùng"
                          aria-label={`Xóa người dùng ${user.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
