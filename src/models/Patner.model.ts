import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
    tableName: 'socios'
})
class Patner extends Model{

    @Column({
        type: DataType.STRING(100)
    })
   declare numero_socio: string;
    
    @Column({
        type: DataType.STRING(32)
    })
   declare fecha_apertura: string;
    
    @Column({
        type: DataType.STRING(32)
    })
   declare nombre: string;
    
    @Column({
        type: DataType.STRING(32)
    })
    declare apellido_paterno: string;
    
    @Column({
        type: DataType.STRING(32)
    })
    declare apellido_materno: string;
    
    @Column({
        type: DataType.STRING(32)
    })
   declare comunidad: string;
    
    @Column({
        type: DataType.STRING(32)
    })
    declare municipio: string;
    
    @Column ({
        type: DataType.FLOAT
    })
    declare cantidad: number;

}

export default Patner;