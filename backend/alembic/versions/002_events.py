"""table events

Revision ID: 002
Revises: 001
Create Date: 2026-08-14 00:00:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "events",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("organizer", sa.String(255), server_default=""),
        sa.Column("location", sa.String(255), server_default=""),
        sa.Column("period", sa.String(100), server_default=""),
        sa.Column("role", sa.String(255), server_default=""),
        sa.Column("description", sa.Text(), server_default=""),
        sa.Column("images", sa.Text(), server_default=""),
        sa.Column("link_url", sa.String(500), server_default=""),
        sa.Column("sort_order", sa.Integer(), server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), onupdate=sa.func.now()),
    )


def downgrade() -> None:
    op.drop_table("events")
