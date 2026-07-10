"""initial schema

Revision ID: 001
Revises: 
Create Date: 2025-07-10 00:00:00.000000
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("username", sa.String(100), unique=True, nullable=False),
        sa.Column("email", sa.String(255), unique=True, nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "projects",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("content", sa.Text(), server_default=""),
        sa.Column("tech_stack", sa.String(500), server_default=""),
        sa.Column("image_url", sa.String(500), server_default=""),
        sa.Column("github_url", sa.String(500), server_default=""),
        sa.Column("demo_url", sa.String(500), server_default=""),
        sa.Column("featured", sa.Integer(), server_default="0"),
        sa.Column("year", sa.Integer(), server_default="2025"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), onupdate=sa.func.now()),
    )

    op.create_table(
        "blog_posts",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("slug", sa.String(255), unique=True, nullable=False, index=True),
        sa.Column("excerpt", sa.Text(), server_default=""),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("cover_image", sa.String(500), server_default=""),
        sa.Column("tags", sa.String(500), server_default=""),
        sa.Column("published", sa.Integer(), server_default="0"),
        sa.Column("read_time", sa.Integer(), server_default="5"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), onupdate=sa.func.now()),
    )

    op.create_table(
        "contact_messages",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("read", sa.Boolean(), server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "skills",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("category", sa.String(100), nullable=False),
        sa.Column("name", sa.String(100), nullable=False),
    )

    op.create_table(
        "stats",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("key", sa.String(), unique=True, nullable=False, index=True),
        sa.Column("value", sa.Integer(), server_default="0"),
    )


def downgrade() -> None:
    op.drop_table("stats")
    op.drop_table("skills")
    op.drop_table("contact_messages")
    op.drop_table("blog_posts")
    op.drop_table("projects")
    op.drop_table("users")
