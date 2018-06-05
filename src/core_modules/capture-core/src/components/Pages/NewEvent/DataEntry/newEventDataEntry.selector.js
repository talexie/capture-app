// @flow
import { createSelector } from 'reselect';
import log from 'loglevel';
import errorCreator from '../../../../utils/errorCreator';
import programCollection from '../../../../metaDataMemoryStores/programCollection/programCollection';

const programIdSelector = state => state.currentSelections.programId;

export const makeProgramNameSelector = () => createSelector(
    programIdSelector,
    (programId: string) => {
        const program = programCollection.get(programId);
        const programName = (program && program.name) || '';
        return programName;
    },
);

export const makeFormFoundationSelector = () => createSelector(
    programIdSelector,
    (programId: string) => {
        const program = programCollection.get(programId);
        if (!program) {
            log.error(errorCreator('programId not found')({ method: 'getFormFoundation' }));
            return null;
        }

        // $FlowSuppress
        const foundation = program.getStage();
        if (!foundation) {
            log.error(errorCreator('stage not found for program')({ method: 'getFormFoundation' }));
            return null;
        }

        return foundation;
    },
);
