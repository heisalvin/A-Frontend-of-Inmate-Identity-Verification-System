"use client"

import { useState } from "react"
import { Shield, Home, UserPlus, Camera, User, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Page } from "@/app/page"

// Add this after the existing interface
interface Role {
  id: string
  name: string
  prison: string
}

const roles: Role[] = [
  { id: "officer-a", name: "Officer Kwabena", prison: "Kumasi Prison" },
  { id: "officer-b", name: "Officer Akosua", prison: "Nsawam Prison" },
  { id: "officer-c", name: "Officer Johnson", prison: "Accra Central Prison" },
]

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [currentRole, setCurrentRole] = useState<Role>(roles[0])

  const navItems = [
    { id: "dashboard" as Page, label: "Dashboard", icon: Home },
    { id: "enroll" as Page, label: "Enroll Inmate", icon: UserPlus },
    { id: "verify" as Page, label: "Verify Inmate", icon: Camera },
    { id: "history" as Page, label: "Inmate History", icon: User },
    { id: "logs" as Page, label: "Logs", icon: FileText },
  ]

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Prison FVS</h1>
              <p className="text-xs text-gray-500">Face Verification System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="flex items-center space-x-2"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Profile Menu */}
          <div className="flex items-center space-x-4">
            {/* Role Selector */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm">
                    <span className="text-gray-600">Logged in as:</span>
                    <span className="ml-1 font-medium">{currentRole.name}</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {roles.map((role) => (
                    <DropdownMenuItem
                      key={role.id}
                      onClick={() => setCurrentRole(role)}
                      className={currentRole.id === role.id ? "bg-blue-50" : ""}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{role.name}</span>
                        <span className="text-xs text-gray-500">{role.prison}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {currentRole.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block">{currentRole.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  Security Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="flex items-center space-x-1 whitespace-nowrap"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
