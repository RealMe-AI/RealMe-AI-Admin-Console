"use client"

import { PageHeader } from "@/components/shared/PageHeader"
import { PageContainer } from "@/components/shared/PageContainer"
import { SectionCard } from "@/components/shared/SectionCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

function GeneralSettings() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" defaultValue="RealMe AI" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" defaultValue="https://realmeai.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Support Email</Label>
        <Input id="email" defaultValue="support@realmeai.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="language">Default Language</Label>
        <Select defaultValue="en">
          <SelectTrigger id="language" className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button>Save changes</Button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  return (
    <div className="space-y-5">
      {[
        { id: "upgrades", label: "Plan upgrades", description: "When a user upgrades their plan" },
        { id: "usage", label: "Usage alerts", description: "When API usage reaches thresholds" },
        { id: "users", label: "New users", description: "When new users register" },
        { id: "bugs", label: "Bug reports", description: "When users submit bug reports" },
      ].map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input type="checkbox" defaultChecked className="peer sr-only" />
            <div className="h-5 w-9 rounded-full border border-border bg-muted transition-colors peer-checked:bg-primary peer-focus:ring-3 peer-focus:ring-ring/20" />
            <div className="absolute left-0.5 top-0.5 size-4 rounded-full bg-background transition-transform peer-checked:translate-x-4" />
          </label>
        </div>
      ))}
      <div className="flex justify-end">
        <Button>Save preferences</Button>
      </div>
    </div>
  )
}

function APISettings() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="api-key">API Key</Label>
        <div className="flex gap-2">
          <Input
            id="api-key"
            defaultValue="rmai_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            readOnly
            className="font-mono text-xs"
          />
          <Button variant="outline">Copy</Button>
          <Button variant="outline">Regenerate</Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="rate-limit">Rate Limit (requests/second)</Label>
        <Input id="rate-limit" type="number" defaultValue="100" className="w-32" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="webhook">Webhook URL</Label>
        <Input id="webhook" placeholder="https://your-app.com/webhook" />
      </div>
      <div className="flex justify-end">
        <Button>Update API settings</Button>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Settings"
        description="Manage your application settings"
      />

      <SectionCard>
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="pt-5">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="notifications" className="pt-5">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="api" className="pt-5">
            <APISettings />
          </TabsContent>
        </Tabs>
      </SectionCard>
    </PageContainer>
  )
}
