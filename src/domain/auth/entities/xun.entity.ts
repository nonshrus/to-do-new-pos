import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('xun')
export class UserXunEntity {
  @PrimaryColumn()
  uname: string; //  		varchar (10)	not null,		-- [PK] รหัสพนักงาน
  @Column()
  ufname?: string; // 		varchar (50)	null,		-- ชื่อและนามสกุล
  @Column()
  upword?: string; // 		varchar (10)	null,		-- รหัสผ่าน
  @Column()
  uwhs?: string; // 	varchar (4)	null,		-- รหัสคลัง
  @Column()
  ulevel?: string; // 	char (1)		null,		-- ระดับพนักงาน
  //-- 'M' = Manager
  //-- 'C' = Cashier
  //-- 'S' = Customer Support
  @Column({ default: 'Y' })
  uactive: string; // 	char (1)		null default 'Y',	-- สถานะใช้งาน ('Y'=ใช้งานอยู่, 'N'=ไม่ใช้งาน)
  @Column('date', { name: 'tblactive' })
  tblactive: Date; //	date		null,		-- Update date
}
