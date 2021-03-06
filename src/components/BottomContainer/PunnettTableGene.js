import React, { Component } from "react";
import PropTypes from "prop-types";

import { capitalizeFirstLetter } from "../../utils/visualFormatting";

import AlleleListboxContainer from "../AlleleListbox/AlleleListboxContainer";
import Diploid from "../Diploid";

import "../../css/table.css";

class PunnettTableGene extends Component {
	static propTypes = {
		gene: PropTypes.string
	};
	render() {
		const { gene } = this.props;
		return (
			<div
				className="punnett"
				role="region"
				aria-label={`Punnett Table for ${gene}`}
			>
				<h1 className="punnettTitle">{capitalizeFirstLetter(gene)}</h1>
				<table>
					<tbody>
						<tr>
							<td rowSpan="2" colSpan="2" />
							<th
								colSpan="2"
								scope="colgroup"
								className="table-header"
							>
								Flower 1
							</th>
						</tr>
						<tr>
							<th scope="col">
								<AlleleListboxContainer
									parentId="flower1"
									alleleType={gene}
									allelePosition={0}
								/>
							</th>
							<th scope="col">
								<AlleleListboxContainer
									parentId="flower1"
									alleleType={gene}
									allelePosition={1}
								/>
							</th>
						</tr>
						<tr>
							<th
								rowSpan="2"
								scope="rowgroup"
								className="table-header "
							>
								<div className="rotate90">Flower 2</div>
							</th>
							<th scope="row">
								<AlleleListboxContainer
									parentId="flower2"
									alleleType={gene}
									allelePosition={0}
								/>
							</th>
							<td>
								<Diploid
									p1Id="flower1"
									p2Id="flower2"
									alleleType={gene}
									a1Pos={0}
									a2Pos={0}
								/>
							</td>
							<td>
								<Diploid
									p1Id="flower1"
									p2Id="flower2"
									alleleType={gene}
									a1Pos={1}
									a2Pos={0}
								/>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<AlleleListboxContainer
									parentId="flower2"
									alleleType={gene}
									allelePosition={1}
								/>
							</th>
							<td>
								<Diploid
									p1Id="flower1"
									p2Id="flower2"
									alleleType={gene}
									a1Pos={0}
									a2Pos={1}
								/>
							</td>
							<td>
								<Diploid
									p1Id="flower1"
									p2Id="flower2"
									alleleType={gene}
									a1Pos={1}
									a2Pos={1}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
export default PunnettTableGene;
