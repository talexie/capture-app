// @flow
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import type {
    CachedRelationshipType,
    CachedRelationshipConstraint,
} from '../../../cache.types';
import { RelationshipType } from '../../../../metaData';

class RelationshipTypesFactory {
    static RELATIONSHIP_ENTITY_NAME = 'PROGRAM_STAGE_INSTANCE';
    cachedRelationshipTypes: Array<CachedRelationshipType>;

    currentProgramId: string;
    currentProgramStageId: string;

    constructor(
        cachedRelationshipTypes: Array<CachedRelationshipType>,
    ) {
        this.cachedRelationshipTypes = cachedRelationshipTypes;
    }

    _relationshipConstraintIsStage(constraint: CachedRelationshipConstraint) {
        return (
            constraint.relationshipEntity === RelationshipTypesFactory.RELATIONSHIP_ENTITY_NAME &&
            (
                (
                    !constraint.programStage &&
                    constraint.program &&
                    constraint.program.id === this.currentProgramId
                ) ||
                (
                    constraint.programStage &&
                    constraint.programStage.id === this.currentProgramStageId
                )
            )
        );
    }

    _convertConstraint(constraint: CachedRelationshipConstraint) {
        const convertedConstraint = {
            entity: constraint.relationshipEntity,
            programId: constraint.program ? constraint.program.id : null,
            programStageId: constraint.programStage ? constraint.programStage.id : null,
            trackedEntityTypeId: constraint.trackedEntityType ? constraint.trackedEntityType.id : null,
        };
        if (!convertedConstraint.programStageId && this._relationshipConstraintIsStage(constraint)) {
            convertedConstraint.programStageId = this.currentProgramStageId;
        }
        return convertedConstraint;
    }

    _buildRelationshipType(cachedRelationshipType: CachedRelationshipType) {
        return new RelationshipType((_this) => {
            _this.id = cachedRelationshipType.id;
            _this.displayName = cachedRelationshipType.displayName;
            _this.from = this._convertConstraint(cachedRelationshipType.fromConstraint);
            _this.to = this._convertConstraint(cachedRelationshipType.toConstraint);
            _this.access = cachedRelationshipType.access;
        });
    }

    build(
        programId: string,
        programStageId: string,
    ): Array<RelationshipType> {
        this.currentProgramId = programId;
        this.currentProgramStageId = programStageId;

        const filteredRelationshipTypes =
            this.cachedRelationshipTypes.filter(rt =>
                this._relationshipConstraintIsStage(rt.fromConstraint) ||
                this._relationshipConstraintIsStage(rt.toConstraint),
            );

        return filteredRelationshipTypes
            .map(rt => this._buildRelationshipType(rt));
    }
}

export default RelationshipTypesFactory;
