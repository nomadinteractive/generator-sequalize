module.exports = (sequelize, DataTypes, globalModelConfig) => {
	const Model = sequelize.define('UserProfile', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			foreignKey: true,
			references: {
				model: 'users',
				key: 'id',
			}
			allowNull: true, 
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true, 
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true, 
		},
		is_featured: {
			type: DataTypes.BOOLEAN,
			allowNull: true, 
		},
		status: {
			type: DataTypes.ENUM,
			values: ['draft', 'published', 'deleted'],
			allowNull: true, 
		},
		stage: {
			type: DataTypes.ENUM,
			values: ['1', '2', '3'],
			allowNull: true, 
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true, 
			defaultValue: 'now()',
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true, 
		},
	}, globalModelConfig)

	Model.associate = (models) => {
		// TODO: Define model relationships
		// Model.belongsTo(models.Users, { foreignKey: 'user_id', as: 'User' })
	}

	return Model
}

