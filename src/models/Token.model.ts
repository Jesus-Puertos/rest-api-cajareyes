
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import User from './User.model';

@Table({
    tableName: 'tokens',
    timestamps: false
})
class Token extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare token: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare user: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    declare createdAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
        get() {
            const createdAt = this.getDataValue('createdAt');
            return new Date(createdAt.getTime() + 10 * 60 * 1000); // 10 minutos para ingresar el token, si no debe pedir otro
        }
    })
    declare expiresAt: Date;
}

export default Token;