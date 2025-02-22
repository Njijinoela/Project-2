"""changed type of image url

Revision ID: 9f3d2eb82052
Revises: a281601ce4c1
Create Date: 2025-02-02 01:29:22.698929

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f3d2eb82052'
down_revision = 'a281601ce4c1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=sa.VARCHAR(length=2000),
               type_=sa.Text(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.alter_column('image_url',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=2000),
               existing_nullable=False)

    # ### end Alembic commands ###
