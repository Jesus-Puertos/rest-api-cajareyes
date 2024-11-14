import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'usuarios'
})
class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare confirmed: boolean;
}

export default User;