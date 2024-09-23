<script setup lang='ts'>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Card class="w-4/5 mx-auto mt-10 mb-12">
    <CardHeader>
      <CardTitle>Create a new Password</CardTitle>
      <CardDescription>Save it here so you can easily find it later!</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="flex items-start gap-x-4">
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="name">Name</Label>
          <Input id="name" placeholder="A nice identifier" />
        </div>
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="password">Password value</Label>
          <Input id="password" placeholder="Your awesome password" />
        </div>
        <div class="flex-1 flex flex-col space-y-1.5">
          <Label for="is-public">Is public?</Label>
          <Select>
            <SelectTrigger id="is-public">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="false">False</SelectItem>
              <SelectItem value="true">True</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="self-end">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
