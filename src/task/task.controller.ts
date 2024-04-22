import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Action, Role } from 'src/enums';
import { CheckPolicies } from 'src/auth/decorator/checkPolicies.decorator';
import { Task } from './task.entity';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { PoliciesGuard } from 'src/auth/policy.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Roles(Role.ADMIN)
  @CheckPolicies({ action: Action.Read, subject: Task })
  @UseGuards(RolesGuard, PoliciesGuard)
  getAllTasks() {
    console.log('ALL TASK HERE');
    return this.taskService.findAll();
  }

  @Post('create')
  createTask(@Request() req, @Body() body) {
    body.userId = req.user.sub;
    return this.taskService.create(body);
  }

  @Patch()
  updateTask(@Body('id') id: number) {
    console.log('TASK UPDATE');
    return this.updateTask(id);
  }
}
