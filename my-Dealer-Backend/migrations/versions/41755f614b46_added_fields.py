from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '41755f614b46'
down_revision = '90e7f399fd78'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    
    # First, drop the 'product' table as per the original logic
    op.drop_table('product')

    # Alter the 'farmer' table
    with op.batch_alter_table('farmer', schema=None) as batch_op:
        # Adding columns with nullable=True initially
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=True, server_default=sa.text('TRUE')))
        batch_op.add_column(sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default=sa.text('FALSE')))
        batch_op.add_column(sa.Column('deleted_at', sa.DateTime(), nullable=True))

        # Create an index for the 'farm_name' column
        batch_op.create_index(batch_op.f('ix_farmer_farm_name'), ['farm_name'], unique=False)

        # Drop the old foreign key and add the new one
        batch_op.drop_constraint('farmer_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'], ondelete='CASCADE')

    # Alter the 'supplier' table
    with op.batch_alter_table('supplier', schema=None) as batch_op:
        # Adding columns with nullable=True initially
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=True, server_default=sa.text('TRUE')))
        batch_op.add_column(sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default=sa.text('FALSE')))
        batch_op.add_column(sa.Column('deleted_at', sa.DateTime(), nullable=True))

        # Create an index for the 'company_name' column
        batch_op.create_index(batch_op.f('ix_supplier_company_name'), ['company_name'], unique=False)

        # Drop the old foreign key and add the new one
        batch_op.drop_constraint('supplier_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'], ondelete='CASCADE')

    # Alter the 'user' table
    with op.batch_alter_table('user', schema=None) as batch_op:
        # Adding columns with nullable=True initially
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=True, server_default=sa.text('TRUE')))
        batch_op.add_column(sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default=sa.text('FALSE')))
        batch_op.add_column(sa.Column('deleted_at', sa.DateTime(), nullable=True))

        # Drop the old unique constraint and create a new index for the 'email' column
        batch_op.drop_constraint('user_email_key', type_='unique')
        batch_op.create_index(batch_op.f('ix_user_email'), ['email'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    
    # Undo the changes in 'user' table
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_user_email'))
        batch_op.create_unique_constraint('user_email_key', ['email'])
        batch_op.drop_column('deleted_at')
        batch_op.drop_column('is_deleted')
        batch_op.drop_column('is_active')

    # Undo the changes in 'supplier' table
    with op.batch_alter_table('supplier', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('supplier_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.drop_index(batch_op.f('ix_supplier_company_name'))
        batch_op.drop_column('deleted_at')
        batch_op.drop_column('is_deleted')
        batch_op.drop_column('is_active')

    # Undo the changes in 'farmer' table
    with op.batch_alter_table('farmer', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('farmer_user_id_fkey', 'user', ['user_id'], ['id'])
        batch_op.drop_index(batch_op.f('ix_farmer_farm_name'))
        batch_op.drop_column('deleted_at')
        batch_op.drop_column('is_deleted')
        batch_op.drop_column('is_active')

    # Re-create the 'product' table
    op.create_table('product',
        sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column('name', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.Column('price', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
        sa.Column('location', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
        sa.PrimaryKeyConstraint('id', name='product_pkey')
    )
    # ### end Alembic commands ###
