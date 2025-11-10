import { Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createResponse } from 'src/common/utils/response';
import { actionMap } from 'src/common/log/action-map';

@Controller('auth')
// @UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('ping')
  async testInterceptor() {
    try {
      return createResponse(
        HttpStatus.CREATED,
        actionMap['created successfully'],
        [],
      );
    } catch (error) {
      return createResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        actionMap['created successfully'],
        [],
        error,
      );
    }
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   // return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   // return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   // return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   // return this.authService.remove(+id);ห
  // }
}
