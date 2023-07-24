CURRENT_DATE=$(date '+%Y-%m-%d')
pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER $POSTGRES_DB -w -Fc >/backup-files/$POSTGRES_DB\_$CURRENT_DATE\_backup.sql.gz
